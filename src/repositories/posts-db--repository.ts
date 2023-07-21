import { blogsCollection, db, postsCollection } from "../db/db"
import { BlogsViewModel } from "../models/blogsModel"
import { PostViewModel } from "../models/postsModel"
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
    async findAllPosts(title: string | null | undefined): Promise<PostViewModel[] | undefined | null> { 

        const filter: any = {}
    
        if (title) {
            filter.title = {$regex: title}
        }
        return postsCollection.find((filter), {projection:{_id:0}}).toArray()
         
        },
        async findPostById(id: string): Promise<PostViewModel | undefined | null> {
            const foundPostById: PostViewModel | undefined | null  = await postsCollection.findOne({newObjectId: id})
            return foundPostById
        },
 
    async createPost(title: string, shortDescription: string, content: string, blogId: string): Promise<PostViewModel | null> {
        const findBlogById: any = await blogsCollection.findOne({newObjectId: blogId})
        const newPost: PostViewModel   = {
            id: (db.posts.length + 1).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: findBlogById.name,
            createdAt: (new Date()).toISOString()
        }
        const res = await postsCollection.insertOne(newPost)
        //return await postsCollection.findOne({newObjectId: newPost.id},{projection:{_id:0}})
        const result: PostViewModel ={
            id: (res.insertedId).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: findBlogById.name,
            createdAt: (new Date()).toISOString()
        }
        return result
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) : Promise<PostViewModel | boolean> {
        const result = await postsCollection.updateOne({ newObjectId: id }, { $set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId} })
        try{postsCollection.updateOne({ newObjectId: id }, { $set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId} })
            return result.matchedCount === 1
    }catch(e){
        return false
    }
    },
    async deletePost(id: string): Promise<boolean> {
        const result = await postsCollection.deleteOne({newObjectId: id})
        try {await postsCollection.deleteOne({newObjectId: id})
        return result.deletedCount === 1
    }catch(e){
        return false
    }
    },
    async deleteAllPosts(): Promise<boolean> {
        const result = await postsCollection.deleteMany({})
        try {await postsCollection.deleteMany({})
        return result.acknowledged 
    }catch(e){
        return false
    }
        
    }
 }







