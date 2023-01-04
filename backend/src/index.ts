import { createServer } from 'http';
import { Server } from 'socket.io';
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import { login, register, verifyToken } from './services';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import auth from './middlewares/auth';
import getUsers from './services/get-users';
// import { parse } from 'cookie';
import saveMessage from './services/save-message';
import getChats from './services/get-chats';
import getMessages from './services/get-messages';
import deleteMessage from './services/delete-message';
import updateMessage from './services/update-message';
import seenMessage from './services/seen-message';

dotenv.config()
const app = express()
const server = createServer(app)
const io = new Server(server, {cors: {origin: 'http://localhost:3000', credentials: true}})

app.use(cors({credentials: true, origin: true}))
app.use(express.json())
app.use(cookieParser())

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI || '', {}).catch(() => 'database connection error')

// io.use((socket, next) => {
//
//     const cookieString = socket.request.headers.cookie;
//     if (!cookieString) return next(new Error('invalid token'));
//
//     const cookies = parse(cookieString);
//     if (verifyToken(cookies.token)) return next();
//     next(new Error('invalid token'));
// });

io.on('connection', (socket) => {
    socket.on('online', async (id: string) => {
        socket.join(id)
    });

    socket.on('message', async (args, cd) => {
        const res = await saveMessage(args)
        if (res) {
            io.to(args.messageId).emit('new_message', args);
            io.to(args.usersId).emit('update_chat');
        }
        cd(res)

    });

    socket.on('message_seen',  async (id: string, chatId: string)=> {
         await seenMessage(id, chatId)
        io.to(id).emit('update_chat');

    })

    socket.on('join_chat', async (chatId) => socket.join(chatId))

    socket.on('leave_chat', async (chatId) => socket.leave(chatId))


    socket.on('delete_message', async (message, cb)=> {
        const res = await deleteMessage(message._id)
        if (!res) return cb()
        io.to(message.messageId).emit('message_removed', message)

    })

    socket.on('update_message', async (message, cb)=> {
        const res = await updateMessage(message)
        io.to(message.to).to(message.from).emit('message_updated', message)
        return cb(res)
    })

});

app.post('/login', async (req, res) => {
    const {error, user} = await login(req.body)
    if (error) return res.status(400).send(error)
    res.cookie('token', user?.token, {
        expires: new Date(Date.now() + 3600 * 1000)
    });
    res.send(user)
})

app.post('/register', async (req, res) => {
    const {error, user} = await register(req.body)
    if (error) return res.status(400).send(error)
    res.cookie('token', user?.token, {
        expires: new Date(Date.now() + 3600 * 1000)
    });
    res.send(user)
})

app.post('/logout', (req, res) => {
    res.cookie('token', '', {expires: new Date()})
    res.send()
})

app.post('/user/verify', async (req, res) => {
    const token = req.cookies.token
    const payload: any = await verifyToken(token)
    res.send(payload)
})

app.get('/users', auth, async (req, res) => {
    const users = await getUsers()
    res.send(users)
})

app.get('/chats/:id', async (req, res) => {
    const id  = req.params.id
    const data  = await getChats(id)
    res.send(data)

})

app.get('/messages/:id', async (req, res) => {
    const id  = req.params.id
    const data  = await getMessages(id)
    res.send(data)
})


server.listen(3001, () => {
    console.log('listening on port 3001');
})
