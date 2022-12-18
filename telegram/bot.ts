import { Telegraf } from 'telegraf'
import start from './middleware/start'
import clone from './middleware/clone'
import { localDB } from '../db/local'
import { logger } from '../utils/logger'
import { token, domain } from '../config/constants'

export const bot = new Telegraf(token)

localDB.set('currentToken', 'default')

bot
    .use(clone)
    .use(start)

bot.launch({
    webhook: {
        domain: domain,
        hookPath: '/api/bot'
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