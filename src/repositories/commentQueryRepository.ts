import { WithId } from "mongodb"
import { commentCollection, postsCollection } from "../db/db"
import { TPagination } from "../hellpers/pagination"
import { PaginatedCommentViewModel, commentViewModel } from "../models/commentModels"




export const commentQueryRepository = {
    async getAllCommentsForPost(postId: string,pagination:TPagination): 
    Promise<PaginatedCommentViewModel<commentViewModel>> {
        const filter = {name: { $regex :pagination.searchNameTerm, $options: 'i'}}
        const result : WithId<WithId<commentViewModel>>[] = await commentCollection.find(filter, {projection: {_id: 0}})
    
    .sort({[pagination.sortBy]: pagination.sortDirection})
    .skip(pagination.skip)
    .limit(pagination.pageSize)
    .toArray()
        const totalCount: number = await commentCollection.countDocuments(filter)
        const pageCount: number = Math.ceil(totalCount / pagination.pageSize)


        const response: PaginatedCommentViewModel<commentViewModel> = {
        pagesCount: pageCount,
        page: pagination.pageNumber,
        pageSize: pagination.pageSize,
        totalCount: totalCount,
        items: result
        }
        return response
    },

    async findComentById(id: string): Promise<commentViewModel | null> {
        return commentCollection.findOne({id: id}, {projection: {_id:0}})

    },


    async deleteAllComment(): Promise<boolean> {
        const result = await commentCollection.deleteMany({})
      
        return result.acknowledged  === true
    
        
    },

    async updateComment(commentId: string, content: string, comentatorInfo: string, userId: string, userLogin: string) : Promise<boolean | undefined> {
        let foundComment = await commentCollection.findOne({id: commentId})
        if(foundComment){
        const result = await commentCollection.updateOne({id: commentId},{ $set:{content: content, comentatorInfo: comentatorInfo, userId: userId, userLogin: userLogin }})
        return result.matchedCount === 1
        }
    },
    async deleteComment(commentId: string){
    const result = await commentCollection.deleteOne({id: commentId})
    return  result.deletedCount === 1
 }
}