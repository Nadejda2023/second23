import { ObjectId } from "mongodb";
import { UsersModel, UsersModelSw } from "../models/usersModel";
import jwt from 'jsonwebtoken'
import { settings } from "../setting";


export const jwtService = {
    async createJWT(user: UsersModelSw) {
        const token = jwt.sign({userId: user.id}, settings.JWT_SECRET, {expiresIn: '100'})
        return token
    },

    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return new ObjectId(result.userId)
        } catch (error) {
            return null
        
        }
    }
}