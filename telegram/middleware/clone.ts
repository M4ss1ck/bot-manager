import { Composer, Markup } from 'telegraf'
import { localDB } from '../../db/local'
import { prisma } from '../../db/prisma'
import { logger } from '../../utils/logger'
import { createBot, setWH } from '../../utils/multibots'

const clone = new Composer()

clone.command('clone', async (ctx) => {
    try {
        logger.success('Clone command')
        const token = ctx.message.text.replace(/\/clone(@\w+)?\s+/gi, '')
        // check if token is valid
        if (/^[0-9]{8,10}:[a-zA-Z0-9_-]{35}$/.test(token)) {
            const bot = await createBot(token)

            if (bot) {
                await prisma.bot
                    .upsert({
                        where: {
                            token: token
                        },
                        update: {
                            owner: ctx.from.id.toString()
                        },
                        create: {
                            token,
                            owner: ctx.from.id.toString()
                        }
                    })
                    .then(() => {
                        // localDB.set(token, bot)
                        ctx.replyWithHTML('Bot created successfully!\nPress button below to set webhook',
                            Markup.inlineKeyboard([
                                Markup.button.callback('Set Webhook', `setwh_${token}`)
                            ]))
                    })
                    .catch(e => {
                        logger.error('Failed to upsert clon bot')
                        logger.error(e)
                    })
            } else {
                await ctx.replyWithHTML('Failed to create bot')
            }
        } else {
            await ctx.replyWithHTML(`Send a valid token from <a href="https://t.me/BotFather">@BotFather</a>\ne.g. <code>/clone 1234567890:AAHVfse7C0QNBrkjhe8dFxjzyw1-nLbnA6c</code>`)
        }
    } catch (error) {
        logger.error(error)
    }
})

clone.action(/setwh_/i, async ctx => {
    if ('data' in ctx.callbackQuery) {
        await ctx.answerCbQuery().catch(e => logger.error(e))
        const token = ctx.callbackQuery.data.replace(/setwh_/i, '')
        const isSet = await setWH(token)
        if (isSet) {
            await ctx
                .replyWithHTML('Webhook was set.')
                .catch(e => {
                    logger.error('Failed to send response')
                    logger.error(e)
                })
        } else {
            await ctx
                .replyWithHTML('Error setting webhook.')
                .catch(e => {
                    logger.error('Failed to send response')
                    logger.error(e)
                })
        }
    }
})

export default clone