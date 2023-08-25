import { WithId } from "mongodb"
import { authCollection, usersCollection } from "../db/db"
import { AuthViewModel } from "../models/authModels"
import { userInfo } from "os"


export const authQueryRepository = {
    async findMe():Promise<WithId<AuthViewModel> | null>  {
        const result : WithId<AuthViewModel> | null = await authCollection.findOne({}, {projection: {_id: 0}})

            return result
    }
}