// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { bot } from '../../telegram/bot'
import { logger } from '../../utils/logger'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        await bot.handleUpdate(req.body).catch(e => logger.error(e))
        res.status(200).json({ name: 'Success' })
    } catch (error) {
        logger.error('Error in try-catch at api/bot')
        res.status(200).json({ name: 'Error' })
    }
}