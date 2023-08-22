import { usersCollection } from "../db/db"

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
    
     const result = usersCollection.deleteOne({id:id})

     return (await result).deletedCount === 1
    
},


}