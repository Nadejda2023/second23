import cors from "cors";
import express from "express";
import { blogsRouter } from "./routers/blogs_router";
import { postsRouter } from "./routers/posts-router";
import { testingRouter } from "./routers/testing-router";
import { BlogsViewModel } from "./models/blogsModel";
import { PostViewModel } from "./models/postsModel";

export const app =  express()

export const RouterPaths:{blogs:string, posts: string, testing: string} ={
    blogs: '/blogs',
    posts: '/posts',
    testing: '/testing'
  }
  
  export type DB = {
    blogs: BlogsViewModel[]
    posts: PostViewModel[]
  }
  

const corsMiddleware = cors();
app.use(corsMiddleware)
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)



app.use(RouterPaths.blogs, blogsRouter)

app.use(RouterPaths.posts, postsRouter)

app.use(RouterPaths.testing, testingRouter)
