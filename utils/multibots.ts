import { Telegraf } from "telegraf";
import axios from "axios";
import { logger } from "./logger";
import { prisma } from "../db/prisma";
import { localDB } from "../db/local";
import start from '../telegram/middleware/start'
// import fetch from 'node-fetch'

const domain = process.env.NEXT_PUBLIC_DOMAIN!;

export const setWH = async (token: string) => {
    try {
        const url = `https://api.telegram.org/bot${token}/setWebhook?url=https://${domain}/api/token/${token}`
        logger.info('WH url: ', url)
        const webhook = await axios(url);
        logger.success(webhook.data);
        return !!webhook.data.ok
    } catch (error) {
        logger.error('Error in setWH')
        logger.error(error);
        return false
    }
}

export const createBot = async (token: string) => {
    logger.info('calling createBot')
    try {
        logger.info('starting new bot')
        const bot = new Telegraf(token)
        bot
            .use(start)

        bot.launch({
            webhook: {
                domain: process.env.NEXT_PUBLIC_DOMAIN!,
                hookPath: `/api/token/${token}`
            },
            dropPendingUpdates: true
        }).catch(e => {
            logger.error('Bot stopped working')
            logger.error(e)
        })

        bot.catch(e => {
            logger.error('Bot general error!')
            logger.error(e)
        })

        localDB.set('currentToken', token)
        return bot
    } catch (error) {
        logger.error(error)
        return null
    }
}

export const loadBot = async (id: string) => {
    try {
        if (id === 'default') {
            const { bot } = await import('../telegram/bot')
            return bot
        } else {
            const botInDB = await prisma.bot.findUnique({
                where: {
                    id: id
                }
            })
            return botInDB ? await createBot(botInDB.token) : null
        }
    } catch (error) {
        logger.error(error)
        return null
    }
}