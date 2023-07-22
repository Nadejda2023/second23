
import { ObjectId } from "mongodb";
import { blogsCollection, db } from "../db/db";
import {  BlogsViewDBModel, BlogsViewModel, } from "../models/blogsModel";
import { randomUUID } from "crypto";



//const dbBlogs =  client.db("project")


export const blogsRepository = {
   async findAllBlogs(title: string | null | undefined): Promise<BlogsViewDBModel[]> { 

    const filter: any = {}

    if (title) {
        filter.title = {$regex: title}
    }
    return blogsCollection.find((filter), {projection:{_id:0}}).toArray()
     
    },

   async findBlogById(id: string): Promise<BlogsViewDBModel| null> {
        const blog : BlogsViewDBModel | null  = await blogsCollection.findOne({id:id}, {projection:{_id:0}}) ////что делать с айдишкой
if (blog){
    return blog
    } else {
        return null
    }

    },
    
    async createBlog(name: string, description: string, website: string): Promise<BlogsViewDBModel| null > {
        const newBlog: BlogsViewModel = {
            id: randomUUID().toString(),   
            name: name,
            description: description,
            websiteUrl: website,
            createdAt: (new Date()).toISOString(),
            isMembership: false,
            
        }
        const result = await blogsCollection.insertOne({...newBlog})
        const newBlogId = await blogsCollection.findOne({id:newBlog.id}, {projection:{_id:0}} )
        return newBlogId
    }, 

    async updateBlog(id: string, name: string, description: string, website: string): Promise< boolean | undefined> {
        let foundBlog = await blogsCollection.findOne({id:id})
        if(foundBlog){
        const result = await blogsCollection.updateOne({id: id},{ $set:{name:name, description:description, websiteUrl: website }})
        return result.matchedCount === 1
        }
    },

    async deleteBlog(id: string) {
        //const filter = {_id:id}
         const result = blogsCollection.deleteOne({id:id})

         return (await result).deletedCount === 1
        
    },

    async deleteAllBlogs(): Promise<boolean> {
        const result = await blogsCollection.deleteMany({})
        try { await blogsCollection.deleteMany({})
            return result.acknowledged
        }catch(e){
                return false
            }
        
    } 
} 