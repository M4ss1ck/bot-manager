import { bot } from "../../../telegram/bot"
import { logger } from "../../../utils/logger"

export async function POST(request: Request) {
    let text = 'Ok!'
    try {
        const body = await request.json()
        await bot.handleUpdate(body).catch(e => logger.error(e))

    } catch (error) {
        logger.error('Error in try-catch at api/bot')
        text = 'Error!'
    }
    return Response.json({ name: text }, { status: 200 })
}