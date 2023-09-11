import { randomUUID } from "crypto";
import { emailAdapter } from "../adapters/email-adapter";
import {  usersTwoRepository } from "../repositories/usersRepository";
import * as bcrypt from 'bcrypt'
import add from "date-fns/add";

export const authService = {
    

    async confirmEmail(code: string): Promise<boolean> {
        let user = await usersTwoRepository.findUserByConfirmationCode(code)
        if(!user) return false
        if (user.emailConfirmation.isConfirmed) return false;
        if (user.emailConfirmation.confirmationCode !== code) return false;
        if (user.emailConfirmation.expirationDate < new Date()) return false;
        console.log("user:", user)
        console.log('confirmed:', user.emailConfirmation.isConfirmed )
        console.log('code:', user.emailConfirmation.confirmationCode === code)
        console.log('exparied:', user.emailConfirmation.expirationDate < new Date(), user.emailConfirmation.expirationDate)
        
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
}
}



