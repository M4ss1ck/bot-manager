import { logger } from "../../../../utils/logger"
import { createBot } from "../../../../utils/multibots"

export async function POST(
    request: Request,
    { params }: { params: Promise<{ token: string }> }
) {
    const { token } = await params
    try {
        const bot = await createBot(token)
        if (bot) {
            const body = await request.json()
            await bot.handleUpdate(body).catch(e => logger.error(e))
            return Response.json({ message: 'All fine' }, { status: 200 })
        } else {
            return Response.json({ message: 'Error' }, { status: 200 })
        }
    } catch (error) {

    }
}