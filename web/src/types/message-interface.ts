interface MessageInterface{
    _id?: string
    messageId: string,
    usersId: string[],
    content: string
    from: string,
    to: string
    createAt: Date
    seen: boolean
}

export default MessageInterface
