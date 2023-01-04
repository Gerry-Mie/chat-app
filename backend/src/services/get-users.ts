import { User } from '../models/user';

const getUsers = () => {
    try {
        return  User.find()
    }catch (error){
        return []
    }
}

export default getUsers
