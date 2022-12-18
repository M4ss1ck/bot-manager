import type { NextApiRequest, NextApiResponse } from 'next'
import { Telegraf } from 'telegraf'
import { logger } from '../../../utils/logger'
import { localDB } from '../../../db/local'
import { createBot } from '../../../utils/multibots'

type Data = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const { token } = req.query
        // TODO: check that token is in DB before creting bot instance
        const bot = await createBot(token as string)
        if (bot) {
            await bot.handleUpdate(req.body).catch(e => logger.error(e))
            res.status(200).json({ message: 'All fine' })
        } else {
            res.status(200).json({ message: 'Error' })
        }
    } catch (error) {
        logger.error('Error in try-catch at api/token/[token]')
        res.status(200).json({ message: 'Error' })
    }
}
