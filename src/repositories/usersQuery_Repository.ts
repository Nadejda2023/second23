import { WithId } from "mongodb"
import { usersCollection } from "../db/db"
import { TPagination } from "../hellpers/pagination"
import { PaginatedUser, UsersInputModel, UsersModel } from "../models/usersModel"


// for get 1
export const usersQueryRepository = {
    async findUsers(pagination: TPagination):
    Promise<PaginatedUser<UsersModel>> {
       const filter = {name: { $regex :pagination.searchNameTerm, $options: 'i'}}
       const result : WithId<WithId<UsersModel>>[] = await usersCollection.find(filter, {projection: {_id: 0}})
   
   .sort({[pagination.sortBy]: pagination.sortDirection})
   .skip(pagination.skip)
   .limit(pagination.pageSize)
   .toArray()
       const totalCount: number = await usersCollection.countDocuments(filter)
       const pageCount: number = Math.ceil(totalCount / pagination.pageSize)


   return {
       pagesCount: pageCount,
       page: pagination.pageNumber,
       pageSize: pagination.pageSize,
       totalCount: totalCount,
       items: result
       }
   },


async createUser(users: UsersModel): Promise<UsersModel> {
    const result = await usersCollection.insertOne(users)
    return users
},
async findUserById(id: string): Promise<UsersModel | null> {
    let foundedUser = await usersCollection.findOne({id: id})
    if (!foundedUser) {
        return null
    } return {
        id: foundedUser.id.toString(),
        login: foundedUser.login,
        email: foundedUser.email,
        createdAt: foundedUser.createdAt,
        passwordSalt: foundedUser.passwordSalt,
        passwordHash: foundedUser.passwordHash

    }
},
async findByLoginOrEmail(loginOrEmail: string) {
    const user = await usersCollection.findOne({ $or: [{ email: loginOrEmail}, { login: loginOrEmail}]})
    return user
}
}