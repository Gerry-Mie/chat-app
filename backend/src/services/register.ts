import { User } from '../models/user';
import { UserInterface } from '../types/user-interface';
import { generateToken } from './jtw';

export const register = async (data: UserInterface) => {
    try {
        const user = new User({
            username:data.username,
            password: data.password,
            name: data.name
        })
        await  user.save()
        const newUser =  user.toJSON()

        delete newUser.password
        const token = generateToken(newUser)
        return {user: {...newUser, token}}

    } catch (er: any) {
        if (er.code === 11000){
            return {error: 'username is taken'}
        }
        return {error: 'something went wrong!'}
    }
}

