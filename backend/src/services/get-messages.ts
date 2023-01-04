import { Message } from '../models/message';

const getMessages = (id:string) => {
    return Message.find({messageId: id})
}

export default getMessages
