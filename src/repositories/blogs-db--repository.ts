import { ObjectId } from "mongodb";
import { blogsCollection, db } from "../db/db";
import { BlogsViewDBModel, BlogsViewModel } from "../models/blogsModel";



//const dbBlogs =  client.db("project")
 const newObjectId = ObjectId

export const blogsRepository = {
   async findAllBlogs(title: string | null | undefined): Promise<BlogsViewModel[]> { 

    const filter: any = {}

    if (title) {
        filter.title = {$regex: title}
    }
    return blogsCollection.find((filter), {projection:{_id:0}}).toArray()
     
    },

   async findBlogById(id: string): Promise<BlogsViewDBModel | null> {
        const foundBlogById: BlogsViewDBModel| null  = await blogsCollection.findOne({id: id}) ////что делать с айдишкой

        return foundBlogById
    },
    
    async createBlog(name: string, description: string, website: string): Promise<BlogsViewDBModel| null > {
        const newBlog: BlogsViewModel = {
            id: (db.blogs.length + 1 ).toString(),   
            name: name,
            description: description,
            websiteUrl: website,
            createdAt: (new Date()).toISOString(),
            isMembership: false,
            
        }
        const res = await blogsCollection.insertOne({...newBlog})
        const result: BlogsViewDBModel= {
            _id: new ObjectId,
            name: name,
            description: description,
            websiteUrl: website,
            createdAt: (new Date()).toISOString(),
            isMembership: false
        }
        return result
    }, 

    async updateBlog(id: string, name: string, description: string, website: string): Promise<BlogsViewModel | boolean> {
        const result = await blogsCollection.updateOne({newObjectId: id},{ $set:{name:name, description:description, websiteUrl: website }})
        return result.matchedCount === 1
    },

    async deleteBlog(id: string): Promise<boolean> {
        //const filter = {_id:id}
        const result = await blogsCollection.deleteOne({newObjectId:id})
        if (result) {
            try {await blogsCollection.deleteOne({newObjectId:id})
            return result.deletedCount === 1;
        }catch(e){
                return false
            }
        
        }else return false
        
        
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