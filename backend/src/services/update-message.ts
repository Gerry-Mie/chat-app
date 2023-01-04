import { Message } from '../models/message';

const updateMessage = async (msg: any) => {
    try {
        return Message.findOneAndUpdate({_id: msg._id}, {$set: {content: msg.content}})
    } catch (err) {
        return null
    }
}

export default updateMessage;
