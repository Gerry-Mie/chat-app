import { User } from '../models/user';
import { generateToken } from './jtw';

type Props = {
    username: string
    password: string
}

export const login = async (data: Props) => {
    try {
        let user = await User.findOne(data).exec()
        if (!user) return {error: 'Invalid username or password'}

        const userInfo =  user.toJSON()

        delete userInfo.password

        const token = generateToken(userInfo)
        return {user: {...userInfo, token}}

    } catch (error) {
        return {error: 'something went wrong!'}
    }
}
