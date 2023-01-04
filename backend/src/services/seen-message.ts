import { Message } from '../models/message';

const seenMessage = (id: string, chatId: string) => {
    try{
        return Message.updateMany(
            {to: id, seen: false, messageId: chatId},
            {$set: {
                    'seen': true
                }
            }
        )
    }catch (err) {
        return null
    }

}

export default seenMessage
