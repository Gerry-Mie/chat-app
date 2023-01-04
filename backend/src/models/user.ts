import mongoose  from 'mongoose'

const userSchema = new mongoose.Schema({
    name: String,
    username:  { type: String, required: true, unique: true },
    password: String
})

export  const User = mongoose.model('User', userSchema)
