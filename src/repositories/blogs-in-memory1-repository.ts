
import { db } from "../db/db";
import { BlogsViewModel } from "../models/blogsModel";

export type blogsType = {
    id:  string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
isMembership: boolean 
   
  }


/*export const blogsRepository = {
   async findAllBlogs(): Promise<blogsType[]> { 
        return db.blogs 
    },

    async findBlogById(id: string): Promise<blogsType[] | boolean> {
        const foundBlogById= db.blogs.find(b => b.id === id) 
        return (BlogsCreateModel())
    },
    
   /* async createBlog(name: string, description: string, website: string): Promise<blogsType[]> {
        const newBlog: blogsType[] = {
            id: (db.blogs.length + 1).toString(),
            name: name,
            description: description,
            websiteUrl: website,
            createdAt: "",
            isMembership: false
        }
        db.blogs.push(newBlog)
        return newBlog
    },*/


   /* async updateBlog(id: string, name: string, description: string, website: string): Promise<boolean> {
        const foundBlogById = db.blogs.find(b => b.id === id);
        if (foundBlogById) {
            foundBlogById.name = name
            foundBlogById.description = description
            foundBlogById.websiteUrl = website
           
            return true
        }
        return false
    },

    async deleteBlog(id: string): Promise<boolean> {
        const foundBlogById = db.blogs.find((b: { id: string; }) => b.id === id)
        if (foundBlogById) {
            db.blogs = db.blogs.filter((b: any) => b !== foundBlogById);
            return true
        } 
        return false
    },

    async deleteAllBlogs() {
        db.blogs.splice(0, db.blogs.length)
    }
}

function BlogsCreateModel(): boolean | blogsType[] | PromiseLike<boolean | blogsType[]> {
    throw new Error("Function not implemented.");
}*/
