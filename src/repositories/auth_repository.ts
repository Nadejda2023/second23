import { WithId } from "mongodb"
import { authCollection, usersAccountCollection } from "../db/db"
import { AuthViewModel } from "../models/authModels"



export const authQueryRepository = {
    async findMe():Promise<WithId<AuthViewModel> | null>  {
        const result : WithId<AuthViewModel> | null = await authCollection.findOne({}, {projection: {_id: 0}})

            return result
    },
    async deleteAllAuth(): Promise<boolean> {
        const result = await authCollection.deleteMany({})
      
        return result.acknowledged  === true
    
        
    },

    async deleteAllAccount(): Promise<boolean> {
        const result = await usersAccountCollection.deleteMany({})
      
        return result.acknowledged  === true
    
        
    },
}