import { ObjectId, WithId } from "mongodb"
import { UsersInputModel, UsersModel } from "../models/usersModel"
import bcrypt from 'bcrypt'
import { randomUUID } from "crypto"
import { usersRepository, usersTwoRepository } from "../repositories/usersRepository"
import { usersQueryRepository } from "../repositories/usersQuery_Repository"

export const usersService = {
    
    async createUser(login: string, email: string, password: string): Promise<UsersModel> { 
        
         const passwordSalt = await bcrypt.genSalt(10) // получаем соль чем больше индекс тем она навороченнее
         const passwordHash = await this._generateHash(password, passwordSalt) //отправляем пароль и соль в метод где создаем хэш и записываем его в переменную

         const newUser: UsersModel = {
            id: randomUUID(),
            login: login,
            email,
            passwordHash,
            passwordSalt,
            createdAt: new Date().toISOString()
         }
         const newUserWithId = await usersQueryRepository.createUser(newUser)
         return newUserWithId 
        },

        //async findUserById(id:ObjectId): Promise<UsersModel | null> {
            
        //},

        async checkCredentials(loginOrEmail: string, password:string) {
            const user  = await usersQueryRepository.findByLoginOrEmail(loginOrEmail)
            if (!user) return false // пара логин и пароль не то
            const passwordHash = await this._generateHash(password,user.passwordSalt)
            if(user.passwordHash !== passwordHash) {
                return false
            }

            return true
        }, 
        async _generateHash(password: string, salt: string){
            const hash = await bcrypt.hash(password,salt)
            //console.log('hash: ' + hash) 
            return hash
        },
        async deleteUserById(id: string): Promise<boolean> {
            return await usersTwoRepository.deleteUsers(id)


        }
}