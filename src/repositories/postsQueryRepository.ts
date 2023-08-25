import { WithId } from "mongodb"
import { commentCollection, postsCollection } from "../db/db"
import { TPagination } from "../hellpers/pagination"
import { PaginatedPost, PostViewModel } from "../models/postsModel"
import { commentViewModel } from "../models/commentModels"
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
   async createPostComment(id: string, content: string, commentatorInfo: {userId:string, userLogin: string}, createdAt: string, postId: string):
   Promise <commentViewModel | null> {
      
      const  post = await postsRepository.findPostById(postId)
      if(!post) return null
      const createCommentForPost: commentViewModel= {
          id: randomUUID(),
          content: content,
          postId: postId,
    commentatorInfo: {
        userId: commentatorInfo.userId,
        userLogin: commentatorInfo.userLogin,
    },
    createdAt: createdAt
}
  
       await commentCollection.insertOne({...createCommentForPost})
      return createCommentForPost
  
  
  },
}