import {  usersCollection } from "../db/db"
import { UsersModel, UsersModelSw } from "../models/usersModel"

export const usersRepository = [
    {
        id: 1,
        loginPassword: 'Basic YWRtaW46cXdlcnR5',
    }
] 
export const usersTwoRepository = {
async deleteAllUsers(): Promise<boolean> {
    const result = await usersCollection.deleteMany({})
  
    return result.acknowledged  === true

    
},

async deleteUsers(id: string) {
    
     const result = await usersCollection.deleteOne({id:id})

     return  result.deletedCount === 1
    
},

/*async findUserByEmail(email: string): Promise<UsersModel> {
    return usersCollection
    .find()
    .sort('createdAt', -1)
    .toArray()
}, */ 

async saveUser ( user: UsersModel): Promise<UsersModel> {
    const result = await usersCollection.insertOne(user)
    return user
},

async findUserById(id: string): Promise<UsersModel | null> {
    let result = await usersCollection.findOne({id:id})
    if(result) {
        return result
    } else {
        return null
    }
    }, 
    async findUserByConfirmationCode(emailConfirmationCode: string) {
        const user = await usersCollection.findOne({"emailConfirmation.confirmationCode": emailConfirmationCode})
        return user
    },
    async findByLoginOrEmail(loginOrEmail: string) {
        const user = await usersCollection.findOne({$or: [{"accountData.email": loginOrEmail}, {"accountData.userName": loginOrEmail}]})
        return user
    },
    async updateConfirmation(id:string) {
        let result = await usersCollection
        .updateOne({id}, {$set:{'emailConfirmation.isConfirmed': true}})
        return result.modifiedCount === 1
    }
}

