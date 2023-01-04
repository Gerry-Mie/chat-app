import userInterface from './user-interface';

interface ChatInterface{
    _id: string,
    user: userInterface,
    unread: number
}

export default ChatInterface
