import { Message } from '../models/message';

const saveMessage =async (message: unknown) => {
    try{
        return Message.create(message)
    }catch (error){
        return null
    }
}

export default saveMessage
