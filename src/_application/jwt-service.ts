import { ObjectId } from "mongodb";
import { UsersModel, UsersModelSw } from "../models/usersModel";
import jwt from 'jsonwebtoken'
import { settings } from "../setting";


export const jwtService = {
    async createJWT(user: UsersModelSw) {
        const token = jwt.sign({userId: user.id}, settings.JWT_SECRET, {expiresIn: '10000sec'})
        return token
    },

    async getUserIdByToken(token: string): Promise<string | null> {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return result.userId;
        } catch (error) {
            console.log(error)
            return null
        
        }
    }
}