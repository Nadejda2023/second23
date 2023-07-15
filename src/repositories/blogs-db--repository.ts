import { blogsCollection, db } from "../db/db";
import { BlogsViewModel } from "../models/blogsModel";



//const dbBlogs =  client.db("project")
 

export const blogsRepository = {
   async findAllBlogs(): Promise<BlogsViewModel[]> { 
    return blogsCollection.find({}).toArray()
     
    },

   async findBlogById(id: string): Promise<BlogsViewModel | null> {
        const foundBlogById: BlogsViewModel| null  = await blogsCollection.findOne({id: id})
        return foundBlogById
    },
    
    async createBlog(name: string, description: string, website: string): Promise<BlogsViewModel | null > {
        const newBlog: BlogsViewModel | null = {
            id: (db.blogs.length + 1 ).toString(),   
            name: name,
            description: description,
            websiteUrl: website,
            createdAt: (new Date()).toISOString(),
            isMembership: false,
            
        }
        const result = await blogsCollection.insertOne(newBlog)
        return newBlog
    }, 

    async updateBlog(id: string, name: string, description: string, website: string): Promise<BlogsViewModel | boolean> {
        const result = await blogsCollection.updateOne({id: id},{ $set:{name:name, description:description, websiteUrl: website }})
        return result.matchedCount === 1
    },

    async deleteBlog(id: string): Promise<boolean> {
        const result = await blogsCollection.deleteOne({id: id})
        return result.deletedCount === 1
        
    },

    async deleteAllBlogs() {
        db.blogs.splice(0, db.blogs.length)
    } 
} 