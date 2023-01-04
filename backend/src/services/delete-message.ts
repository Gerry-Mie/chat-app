import { Message } from '../models/message';

const deleteMessage = (id: string) => {
    try {
       return  Message.deleteOne({_id: id})
    }catch (err){
        return null
    }
}

export default deleteMessage;
