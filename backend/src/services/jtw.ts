import { JwtPayload, sign, verify } from 'jsonwebtoken'

export const generateToken = (payload: object): string => {
    return sign(payload, process.env.JWT_SECRET || '')
}

export const verifyToken = (token: string) => {
    try{
        return verify(token, process.env.JWT_SECRET || '')
    }catch (err: any){
        return null
    }
}
