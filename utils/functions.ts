import crypto from 'crypto'

export const signatureFunc = async (msgId: number, chatId: number, userId: number, joinTime: number): Promise<string> => {
    let signOri = `${msgId}, ${chatId}, ${userId}, ${joinTime}`
    const sign = crypto.createHmac("sha256", process.env.TGWD_SECRET || "").update(signOri).digest('hex')
    return sign
}