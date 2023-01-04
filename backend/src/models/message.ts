import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    messageId: String,
    usersId: [String],
    content: String,
    from: String,
    to: String,
    createAt: Date,
    seen: Boolean
})

export const Message = mongoose.model('Message', messageSchema)
