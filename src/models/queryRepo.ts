import { Collection, FindCursor, InsertOneResult, ObjectId, WithId } from "mongodb"
import { BlogsViewDBModel, BlogsViewModel, PaginatedBlog } from "./blogsModel"
import { blogsCollection, postsCollection } from "../db/db"
import { PaginatedPost, PostViewDBModel, PostViewModel } from "./postsModel"
import { title } from "process"
import { randomUUID } from "crypto"
import e from "express"

function skip2(pageNumber: number, pageSize: number): number {
    return (+pageNumber - 1) * (+pageSize)
 }

export const blogsQueryRepository = {
    //1
    async findBlogs(pageNumber: string, pageSize: string, sortDirection: string,  sortBy: string):
     Promise<PaginatedBlog<BlogsViewModel>> {
        const result : WithId<WithId<BlogsViewModel>>[] = await blogsCollection.find({}, {projection: {_id: 0}})
    .sort({[sortBy]: sortDirection === "desc" ? 1: -1})
    .skip(skip2 (+pageNumber, +pageSize))
    .limit(+pageSize)
    .toArray()


    // const itemsBlog: BlogsViewModel[] = result.map((el: any)=> ({
    //     id: el.id,
    //     name: el.name,
    //     description: el.description,
    //     websiteUrl: el.websiteUrl,
    //     createdAt: el.createdAt,
    //     isMembership: el.isMembership
    // }))

        const totalCount: number = await postsCollection.countDocuments()
        const pageCount: number = Math.ceil(totalCount / +pageSize)


    const res: PaginatedBlog<BlogsViewModel> = {
        pagesCount: pageCount,
        page: +pageNumber,
        pageSize: +pageSize,
        totalCount: totalCount,
        items: result
        }
        return res
    },



    async findPostForBlog(pageNumber: string, pageSize: string, sortDirection: string,  sortBy: string):
     Promise<PaginatedPost<PostViewModel>> {
        const result: WithId<WithId<PostViewModel>>[] = await postsCollection.find({}, {projection: {_id: 0}})
    .sort({[sortBy]: sortDirection === 'desc' ? 1: -1})
    .skip(skip2 (+pageNumber, +pageSize))
    .limit(+pageSize)
    .toArray() 


    // const itemsPost: PostViewModel[] = result.map((el: any) => ({
    //     id: el.id,
    //     title: el.title,
    //     shortDescription: el.shortDescription,
    //     content: el.content,
    //     blogId: el.blogId,
    //     blogName: el.blogName,
    //     createdAt: el.createdAt
    //     }))

        const totalCount: number = await postsCollection.countDocuments()
        const pageCount: number = Math.ceil(totalCount / (+pageSize))


    const response: PaginatedPost<PostViewModel> = {
        pagesCount: pageCount,
        page: +pageNumber,
        pageSize: +pageSize,
        totalCount: totalCount,
        items: result
        }
        return response



        //return blogsCollection.findOne({id:id}, {projection:{_id:0}}) 

    },
    
   
    //createPostForBlog to do

async createPostForBlog(title: string, shortDescription: string, content: string,  blogId: string):
 Promise <PostViewModel | null> {
    
    const  createPostForBlogResult : WithId<WithId<BlogsViewModel>> | null = await blogsCollection.findOne({_id:new ObjectId(blogId)})
if (!createPostForBlogResult) {
    return null
}


const createPostForBlog: PostViewModel= {
    id: randomUUID(),
    title: title,
    shortDescription: shortDescription,
    content: content,
    blogId: blogId,
    blogName: createPostForBlogResult.name,
    createdAt: new Date().toISOString()
    }

    const result : InsertOneResult<WithId<PostViewModel>> = await postsCollection.insertOne(createPostForBlog)
    return {
        id: result.insertedId.toString(),
        title: createPostForBlog.title,
        shortDescription: createPostForBlog.shortDescription,
        content: createPostForBlog.content,
        blogId: blogId,
        blogName: createPostForBlog.blogName,
        createdAt: createPostForBlog.createdAt,
    }


},



    //1
    async findAllPosts(pageNumber: string, pageSize: string, sortDirection: string,  sortBy: string):
     Promise<PaginatedPost<PostViewModel>> {
        const result : WithId<WithId<PostViewModel>>[] = await postsCollection.find({})
    .sort({[sortBy]: sortDirection === "desc" ? 1: -1})
    .skip(skip2 (+pageNumber, +pageSize))
    .limit(+pageSize)
    .toArray()


    const itemsPost: PostViewModel[] = result.map((el: any)=> ({
        id: el._id.toString(),
    title: el.title,
    shortDescription: el.shortDescription,
    content: el.content,
    blogId: el.blogId,
    blogName: el.blogName,
    createdAt: el.createdAt.toISOString(),
       
    }))

        const totalCount: number = await postsCollection.countDocuments()
        const pageCount: number = Math.ceil(totalCount / +pageSize)


    const res: PaginatedPost<PostViewModel> = {
        pagesCount: pageCount,
        page: +pageNumber,
        pageSize: +pageSize,
        totalCount: totalCount,
        items: itemsPost
        }
        return res
    }
    





}
