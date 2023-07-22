import { randomUUID } from "crypto"
import { blogsCollection, db, postsCollection } from "../db/db"
import { BlogsViewModel } from "../models/blogsModel"
import { PostViewDBModel, PostViewModel } from "../models/postsModel"
import { blogsRepository } from "./blogs-db--repository"
//import { blogsRepository } from "./blogs-in-memory-repository"
 
/*type postsType = {
    id: string,
      title: string,
      shortDescription: string,
      content: string,
      blogId: string,
      blogName: string
}*/

 //export type postsArrayType = Array<postsType>
 //let postsArray: postsArrayType = []

 export const postsRepository = {
    async findAllPosts(title: string | null | undefined): Promise<PostViewDBModel[] | undefined | null> { 

        const filter: any = {}
    
        if (title) {
            filter.title = {$regex: title}
        }
        return postsCollection.find((filter), {projection:{_id:0}}).toArray()
         
        },
        async findPostById(id: string): Promise<PostViewDBModel | undefined | null> {
            const post: PostViewDBModel | undefined | null  = await postsCollection.findOne({id:id}, {projection: {_id:0}})
            if (post) {
                return post
            }else {
                return null
            }
            
        },
 
    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<PostViewDBModel | null> {
        const blog = await blogsCollection.findOne({id: blogId}, {projection: {_id:0}})
        if(!blog) return null 
        const newPost: PostViewModel   = {
            id: randomUUID(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blog.name,
            createdAt: new Date().toISOString()
        }
        
        //return await postsCollection.findOne({newObjectId: newPost.id},{projection:{_id:0}})
        
       
        const result = await postsCollection.insertOne({...newPost})
        const newPostWithId =  await postsCollection.findOne({id:newPost.id}, {projection:{_id:0}} )
        return newPostWithId 
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) : Promise<boolean | undefined> {
        let foundPost = await postsCollection.findOne({id:id})
        let foundBlogName = await blogsCollection.findOne({id: blogId}, {projection: {_id:0}})
        if(foundPost){
            if(foundBlogName) {
                const result = await postsCollection.updateOne({ id : id }, { $set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId} })
                return result.matchedCount === 1

            }
        }
        
    
    },
    async deletePost(id: string): Promise<boolean> {
        const result = await postsCollection.deleteOne({id: id})
        return result.deletedCount === 1
   
    },
    async deleteAllPosts(): Promise<boolean> {
        const result = await postsCollection.deleteMany({})
      
        return result.acknowledged  === true
    
        
    }
 }







