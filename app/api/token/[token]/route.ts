import { logger } from "../../../../utils/logger"
import { createBot } from "../../../../utils/multibots"

export async function POST(
    request: Request,
    { params }: { params: { token: string } }
) {
    const token = params.token // 'a', 'b', or 'c'
    try {
        const bot = await createBot(token as string)
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