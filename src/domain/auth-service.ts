import { randomUUID } from "crypto";
import { emailAdapter } from "../adapters/email-adapter";
import {  usersTwoRepository } from "../repositories/usersRepository";
import * as bcrypt from 'bcrypt'
import add from "date-fns/add";
import { tokenCollection, usersCollection } from "../db/db";
import jwt from 'jsonwebtoken'
import { AnyAaaaRecord } from "dns";
import { accessTokenSecret1, refreshTokenSecret2 } from "../setting";

export const authService = {
    

    async confirmEmail(code: string): Promise<boolean> {
        let user = await usersTwoRepository.findUserByConfirmationCode(code) 
        if(!user) return false 
        if (user.emailConfirmation.isConfirmed) return false;
        if (user.emailConfirmation.confirmationCode !== code) return false;
        if (user.emailConfirmation.expirationDate < new Date()) return false;
       
       
        
        
            let result = await usersTwoRepository.updateConfirmation(user.id)
            console.log(result, ' result')
            return result
        
        
    },
    async ressendingEmail(email: string): Promise<boolean | null> {
        let user = await usersTwoRepository.findUserByEmail(email)
        if(!user) return false;
        if (user.emailConfirmation.isConfirmed) return false;
       
            const confirmationCode = randomUUID()
            const expiritionDate = add(new Date(), {
                hours: 1,
                minutes: 2
            })
            await usersTwoRepository.updateCode(user.id, confirmationCode, expiritionDate);

            try{
                await emailAdapter.sendEmail(user.email, 'code', confirmationCode)
            } catch(error){
                console.log(error);
            }
            

            return true
        
          
    },
    

    // to do resend email
    async _generateHash(password: string): Promise<string>{ 
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        //console.log('hash: ' + hash) 
        return hash
},


async validateRefreshToken(refreshToken: string): Promise<any>{
    try {
        //ok: {userId}
      const payload = jwt.verify(refreshToken, refreshTokenSecret2);
  
    
      //const invalidatedToken = await tokenCollection.findOne({ token: refreshToken });
  
      //if (invalidatedToken) {
       // return false;
      //}
      return payload;
    } catch (error) {
      return null; // if token invalid
    }

},

async refreshTokens(userId: string): Promise<{ accessToken: string, newRefreshToken: string }> {
    try {
      // Декодируем старый refreshToken
     // const decoded = jwt.verify(oldRefreshToken, refreshTokenSecret);
  
      // Генерируем новый accessToken с данными пользователя из старого refreshToken
      const accessToken = jwt.sign({ userId }, accessTokenSecret1 , { expiresIn: '10s' });
  
      // Генерируем новый refreshToken
      const newRefreshToken = jwt.sign({ userId }, refreshTokenSecret2, { expiresIn: '20s' });
  
      return { accessToken, newRefreshToken };
    } catch (error) {
      throw new Error('Failed to refresh tokens');
    }
  }
}




