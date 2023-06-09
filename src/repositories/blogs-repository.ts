import { Request, Router ,Response } from "express";




export type blogsType = {
  
  id: string,
  name: string,
  description: string,
  websiteUrl: string
   
}

export type DB = {
  blogs : blogsType[]
}

const db: DB = {
  blogs: [
    {
      "id": "0",
      "name": "string",
      "description": "string",
      "websiteUrl": "string"
    },
    {
      "id": "1",
      "name": "string",
      "description": "string",
      "websiteUrl": "string"
    }

  ]
}
export type blogsArrayType = Array<blogsType>
let blogsArray: blogsArrayType = []

export const blogRepository = {
  testingDeleteAllBlogs(){
    return db.blogs = []
  },
    findAllBlogs(): blogsArrayType {
        return blogsArray
    },
    getBlogById(id:string) : blogsType | undefined {
        let foundBlogById = blogsArray.find(blog => blog.id === id)
        return foundBlogById
    },
    createBlogs(name:string,description: string, websiteUrl:string) {
        const newBlog: blogsType = {
            id: (+(new Date())).toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
          }
          db.blogs.push(newBlog)
          return newBlog
    },
    
    updateBlogs(name:string,description:string,websiteUrl:string) {
      const isUpBlog: blogsType = {
        id: (+(new Date())).toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
      }
      db.blogs.push(isUpBlog)
          return isUpBlog
    },

    deleteBlogs(id:string) {
      for (let i = 0 ; i < db.blogs.length; i++) {
        if (db.blogs[i].id === id) {
          db.blogs.splice(i,1)
          return true
        }
      }
      return false
    }
}
