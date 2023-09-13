import { ObjectId } from "mongodb";
import { UsersModel, UsersModelSw } from "../models/usersModel";
import jwt from 'jsonwebtoken'
import { settings } from "../setting";
import { usersCollection } from "../db/db";



export const jwtService = {
    async createJWT(user: UsersModelSw) {
        const token = jwt.sign({userId: user.id}, settings.JWT_SECRET, {expiresIn: '10000sec'})
        return token
    },
    
    async createJWTRT(user: UsersModelSw) {
        const rtoken = jwt.sign({ userId: user.id }, settings.JWT_SECRET, { expiresIn: '20s' });
        return rtoken
    },

    async getUserIdByToken(token: string): Promise<string | null> {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return result.userId;
        } catch (error) {
            console.log(error)
            return null
        
        }
    },
    async  isTokenInvalidated(token: string) {
        const result = await usersCollection.findOne({ token });
        return result;
      },
    async verifyRefreshToken(refreshToken: string, refreshTokenSecret: string) {
        return new Promise((resolve, reject) => {
          jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
            if (err) {
              reject('Invalid refresh token');
            } else {
              resolve(user);
            }
          });
        })
}
}