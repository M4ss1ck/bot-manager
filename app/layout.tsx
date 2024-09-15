import type { Metadata } from 'next'
import Script from 'next/script';
import '../styles/globals.css'

export const metadata: Metadata = {
    title: 'Bot Manager',
    description: 'Telegram bot with NextJS app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html>
            <body>
                {children}
                <Script
                    src="https://telegram.org/js/telegram-web-app.js"
                    strategy="beforeInteractive"
                />
            </body>
        </html>
    )
}