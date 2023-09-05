import { usersAccountCollection, usersCollection } from "../db/db"
import { UserAccountDBType, UserAccountType } from "../models/mailModels"
import { UsersModelSw } from "../models/usersModel"

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

/*async getAllUsers(): Promise<UsersModelSw> {
    return usersCollection
    .find()
    .sort('createdAt', -1)
    .toArray()
}, */

async saveUser ( user: UserAccountDBType): Promise<UserAccountDBType> {
    const result = await usersAccountCollection.insertOne(user)
    return user
},

async findUserById(id: string): Promise<UserAccountDBType | null> {
    let result = await usersAccountCollection.findOne({id:id})
    if(result) {
        return result
    } else {
        return null
    }
    }, 
    async findUserByConfirmationCode(emailConfirmationCode: string) {
        const user = await usersAccountCollection.findOne({"emailConfirmation.confirmationCode": emailConfirmationCode})
        return user
    },
    async findByLoginOrEmail(loginOrEmail: string) {
        const user = await usersAccountCollection.findOne({$or: [{"accountData.email": loginOrEmail}, {"accountData.userName": loginOrEmail}]})
        return user
    },
    async updateConfirmation(id:string) {
        let result = await usersCollection
        .updateOne({id}, {$set:{'emailConfirmation.isConfirmed': true}})
        return result.modifiedCount === 1
    }
}

