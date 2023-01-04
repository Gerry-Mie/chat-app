import { RequestHandler } from 'express';
import { verifyToken } from '../services';

const auth: RequestHandler = (req, res, next) => {
    const token = req.cookies.token

    if (!token) return  res.status(401).send('Please login')

    const payload =  verifyToken(token)
    if (!payload) return  res.status(401).send('Please login')

    // find user

    next()
}

export default auth
