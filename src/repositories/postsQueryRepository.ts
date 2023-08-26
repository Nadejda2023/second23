import { WithId } from "mongodb"
import { commentCollection, postsCollection } from "../db/db"
import { TPagination } from "../hellpers/pagination"
import { PaginatedPost, PostViewModel } from "../models/postsModel"
import { PaginatedCommentViewModel, commentViewModel } from "../models/commentModels"
import { postsRepository } from "./posts_db__repository"
import { randomUUID } from "crypto"
import { userInfo } from "os"

export const postsQueryRepository = {
    async findPosts(pagination: TPagination):
    Promise<PaginatedPost<PostViewModel>> {
       const filter = {name: { $regex :pagination.searchNameTerm, $options: 'i'}}
       const result : WithId<WithId<PostViewModel>>[] = await postsCollection.find(filter, {projection: {_id: 0}})
   
   .sort({[pagination.sortBy]: pagination.sortDirection})
   .skip(pagination.skip)
   .limit(pagination.pageSize)
   .toArray()
       const totalCount: number = await postsCollection.countDocuments(filter)
       const pageCount: number = Math.ceil(totalCount / pagination.pageSize)


   return {
       pagesCount: pageCount,
       page: pagination.pageNumber,
       pageSize: pagination.pageSize,
       totalCount: totalCount,
       items: result
       }
   },
   async createPostComment(postId: string, content: string, commentatorInfo: {userId:string, userLogin: string}):
   Promise <any> {
      

      const createCommentForPost = {
            id: randomUUID(),
            content,
            postId,
            commentatorInfo,
            createdAt: new Date().toISOString()
}
  
       await commentCollection.insertOne({...createCommentForPost})
      return  {
        id: createCommentForPost.id,
        content: createCommentForPost.content,
        commentatorInfo: createCommentForPost.commentatorInfo,
        createdAt: createCommentForPost.createdAt
}
  
  },
  async getAllCommentsForPost(pagination: TPagination):
    Promise<PaginatedCommentViewModel<commentViewModel>> {
       const filter = {name: { $regex :pagination.searchNameTerm, $options: 'i'}}
       const result : WithId<WithId<commentViewModel>>[] = await commentCollection.find(filter, {projection: {_id: 0}})
   
   .sort({[pagination.sortBy]: pagination.sortDirection})
   .skip(pagination.skip)
   .limit(pagination.pageSize)
   .toArray()
       const totalCount: number = await commentCollection.countDocuments(filter)
       const pageCount: number = Math.ceil(totalCount / pagination.pageSize)


   return {
       pagesCount: pageCount,
       page: pagination.pageNumber,
       pageSize: pagination.pageSize,
       totalCount: totalCount,
       items: result
       }
   },
}