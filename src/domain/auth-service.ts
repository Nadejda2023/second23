import {  usersTwoRepository } from "../repositories/usersRepository";
import * as bcrypt from 'bcrypt'

export const authService = {
    

    async confirmEmail(code: string): Promise<boolean> {
        let user = await usersTwoRepository.findUserByConfirmationCode(code)
        console.log(user) 
        if(!user) return false
        if (user.emailConfirmation.isConfirmed) return false;
        if (user.emailConfirmation.confirmationCode !== code) return false;
        if (user.emailConfirmation.expirationDate < new Date()) return false;
         console.log()
            let result = await usersTwoRepository.updateConfirmation(user.id)
            return result
        
        
    },
    async _generateHash(password: string): Promise<string>{ 
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        //console.log('hash: ' + hash) 
        return hash
}
}



