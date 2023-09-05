import {  usersTwoRepository } from "../repositories/usersRepository";
import add from 'date-fns/add'
import { emailManager } from "../managers/email-managers";
import { UserAccountDBType, UserAccountType } from "../models/mailModels";
import { randomUUID } from "crypto";
import { UsersModel } from "../models/usersModel";
import * as bcrypt from 'bcrypt'

export const authService = {
    async createUser(login: string, email: string, password: string) : Promise<UserAccountDBType | null> {
    const passwordHash = await this._generateHash(password)
    const user: UserAccountDBType = {
        id: randomUUID(),
        accountData:{
            userName: login,
            email,
            passwordHash,
            createdAt: new Date(),
            
        },
        emailConfirmation: {
            confirmationCode: randomUUID(),
            expirationDate: add(new Date(), {
                hours: 1,
                minutes: 3
            }),
            isConfirmed: false,
            sentEmails: []
        }
    }
    const createResult = usersTwoRepository.saveUser(user)
    try {
    await emailManager.sendEmailConfirmationMessage(user) //сделаиь метод для отправки письма
    } catch(error){
        console.error(error)
        //await usersTwoRepository.deleteUsers(user.id)
        return null;
    }
    return createResult;
},

    async confirmEmail(code: string): Promise<boolean> {
        let user = await usersTwoRepository.findUserByConfirmationCode(code)
        if(!user) return false
        if (user.emailConfirmation.isConfirmed) return false;
        if (user.emailConfirmation.confirmationCode !== code) return false;
        if (user.emailConfirmation.expirationDate < new Date()) return false;
         
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



