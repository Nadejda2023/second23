
import { ObjectId } from "mongodb";
import { blogsCollection, db } from "../db/db";
import {  BlogsViewDBModel, BlogsViewModel, } from "../models/blogsModel";
import { randomUUID } from "crypto";



//const dbBlogs =  client.db("project")


export const blogsRepository = {
   async findAllBlogs(title: string | null | undefined): Promise<BlogsViewModel[]> { 

    const filter: any = {}

    if (title) {
        filter.title = {$regex: title}
    }
    return blogsCollection.find((filter), {projection:{_id:0}}).toArray()
     
    },

   async findBlogById(id: string): Promise<BlogsViewDBModel| null> {
        const foundBlogById: BlogsViewDBModel | null  = await blogsCollection.findOne({_id: new ObjectId(id)}) ////что делать с айдишкой

        return foundBlogById
    },
    
    async createBlog(name: string, description: string, website: string): Promise<BlogsViewModel| null > {
        const newBlog: BlogsViewModel = {
            id: randomUUID(),   
            name: name,
            description: description,
            websiteUrl: website,
            createdAt: (new Date()).toISOString(),
            isMembership: false,
            
        }
        await blogsCollection.insertOne({...newBlog})
        return newBlog
    }, 

    async updateBlog(id: string, name: string, description: string, website: string): Promise<BlogsViewModel | boolean> {
        const result = await blogsCollection.updateOne({id},{ $set:{name:name, description:description, websiteUrl: website }})
        return result.matchedCount === 1
    },

    async deleteBlog(id: string) {
        //const filter = {_id:id}
        return blogsCollection.deleteOne({id})
        
        
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