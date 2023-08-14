import { Collection, FindCursor, InsertOneResult, ObjectId, WithId } from "mongodb"
import { BlogsViewDBModel, BlogsViewModel, PaginatedBlog } from "./blogsModel"
import { blogsCollection, postsCollection } from "../db/db"
import { PaginatedPost, PostViewDBModel, PostViewModel } from "./postsModel"
import { title } from "process"
import { randomUUID } from "crypto"
import e from "express"
import { blogsRepository } from "../repositories/blogs_db__repository"
import { TPagination } from "../hellpers/pagination"



export const blogsQueryRepository = {
    //1
    async findBlogs(pagination: TPagination):
     Promise<PaginatedBlog<BlogsViewModel>> {
        const result : WithId<WithId<BlogsViewModel>>[] = await blogsCollection.find({}, {projection: {_id: 0}})
    .sort({[pagination.sortBy]: pagination.sortDirection})
    .skip(pagination.skip)
    .limit(pagination.pageSize)
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
        const pageCount: number = Math.ceil(totalCount / pagination.pageSize)


    const res: PaginatedBlog<BlogsViewModel> = {
        pagesCount: pageCount,
        page: pagination.pageNumber,
        pageSize: pagination.pageSize,
        totalCount: totalCount,
        items: result
        }
        return res
    },



    async findPostForBlog(pagination: TPagination):
     Promise<PaginatedPost<PostViewModel>> {
        const result: WithId<WithId<PostViewModel>>[] = await postsCollection.find({}, {projection: {_id: 0}})
    .sort({[pagination.sortBy]: pagination.sortDirection})
    .skip(pagination.skip)
    .limit(pagination.pageSize)
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
        const pageCount: number = Math.ceil(totalCount / (pagination.pageSize))


    const response: PaginatedPost<PostViewModel> = {
        pagesCount: pageCount,
        page: pagination.pageNumber,
        pageSize: pagination.pageSize,
        totalCount: totalCount,
        items: result
        }
        



        return  response//postsCollection.findOne({}, {projection:{_id:0}}) 

    },
    
   
    //createPostForBlog to do

async createPostForBlog(title: string, shortDescription: string, content: string,  blogId: string):
 Promise <PostViewModel | null> {
    
    const  blog = await blogsRepository.findBlogById(blogId)
    if(!blog) return null
    const createPostForBlog: PostViewModel= {
        id: randomUUID(),
        title: title,
        shortDescription: shortDescription,
        content: content,
        blogId: blog.id,
        blogName: blog.name,
        createdAt: new Date().toISOString()
        }

     await postsCollection.insertOne({...createPostForBlog})
    return createPostForBlog


},



    //1
    async findAllPosts(pagination: TPagination):
     Promise<PaginatedPost<PostViewModel>> {
        const result : WithId<WithId<PostViewModel>>[] = await postsCollection.find({}, {projection: {_id: 0}})
    .sort({[pagination.sortBy]: pagination.sortDirection })
    .skip(pagination.skip)
    .limit(pagination.pageSize)
    .toArray()


    // const itemsPost: PostViewModel[] = result.map((el: any)=> ({
    //     id: el._id.toString(),
    // title: el.title,
    // shortDescription: el.shortDescription,
    // content: el.content,
    // blogId: el.blogId,
    // blogName: el.blogName,
    // createdAt: el.createdAt.toISOString(),
       
    // }))

        const totalCount: number = await blogsCollection.countDocuments()
        const pageCount: number = Math.ceil(totalCount / pagination.pageSize)


    const response: PaginatedPost<PostViewModel> = {
        pagesCount: pageCount,
        page: pagination.pageNumber,
        pageSize: pagination.pageSize,
        totalCount: totalCount,
        items: result
        }
        return response
    }
    





}
