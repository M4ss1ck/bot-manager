"use client"
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

declare global {
    interface Window {
        Telegram?: any;
    }
}

export function HomeContent() {
    const searchParams = useSearchParams()
    const params = searchParams.toString()
    const [state, setState] = useState({
        loginStatus: 0,
        errmsg: "",
        tglogin: {} as any,
        userProfile: {} as any,
        query: params,
        lang: "",
        axiosError: {} as any,
        initData: [] as string[]
    })

    useEffect(() => {
        setState(state => {
            return {
                ...state,
                lang: navigator.language,
            }
        })
    }, [])

    useEffect(() => {
        if (window.Telegram.WebApp.initData) {
            const initDataRaw = decodeURIComponent(window.Telegram.WebApp.initData).split("&")
            setState(state => { return { ...state, initData: initDataRaw } })
            let initData: any = {}
            for (let i in initDataRaw) {
                // initData[initDataRaw[i].split("=")[0]] = initDataRaw[i].split("=")[1]
                switch (initDataRaw[i].split("=")[0]) {
                    case 'query_id':
                        initData.query_id = initDataRaw[i].split("=")[1]
                        break
                    case 'user':
                        initData.user = initDataRaw[i].split("=")[1]
                        break
                    case 'auth_date':
                        initData.auth_date = parseInt(initDataRaw[i].split("=")[1])
                        break
                    case 'hash':
                        initData.hash = initDataRaw[i].split("=")[1]
                        break
                }
            }
            setState(state => ({
                ...state,
                tglogin: initData,
                userProfile: JSON.parse(initData.user),
                loginStatus: 1
            }))
        } else {
            setState(state => ({
                ...state,
                loginStatus: -1
            }))
        }
    }, [])

    const Greetings = () => state.userProfile.first_name ? <div className="mb-4 text-lg font-bold text-slate-400">
        {`Welcome, ${state.userProfile.first_name}${state.userProfile.last_name ? ` ${state.userProfile.last_name}` : ''}`}
    </div> : null

    return (
        <div className="bg-telegram-bg">
            <div className="flex items-center justify-start flex-col gap-2 h-[100vh] p-4 text-center">
                {state.loginStatus === -1 && <div>
                    <p className="text-lg font-bold text-telegram-text">Error, please open the page within Telegram</p>
                </div>}
                {state.loginStatus === 1 && <div>
                    <Greetings />
                </div>}
                <footer className="absolute text-lg font-bold text-telegram-text bottom-1">
                    Template WebApp bootstrapped using NextJS, Tailwind CSS and Telegraf.
                </footer>
            </div>
        </div>
    )
}

export default function Home() {
    return (
        <Suspense>
            <HomeContent />
        </Suspense>
    )
}