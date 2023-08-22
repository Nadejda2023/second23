import cors from "cors";
import express from "express";
import { blogsRouter } from "./routers/blogs_router";
import { postsRouter } from "./routers/posts-router";
import { testingRouter } from "./routers/testing-router";
import { BlogsViewModel } from "./models/blogsModel";
import { PostViewModel } from "./models/postsModel";
import { UsersModel } from "./models/usersModel";
import { usersRouter } from "./routers/users_router";
import { authRouter } from "./routers/auth-router";

export const app =  express()

export const RouterPaths:{blogs:string, posts: string, testing: string, users:string, auth: string} ={
    blogs: '/blogs',
    posts: '/posts',
    testing: '/testing',
    users: '/users',
    auth: '/auth'
  }
  
  export type DB = {
    blogs: BlogsViewModel[]
    posts: PostViewModel[]
  }
  export type U = {
    users: UsersModel[]
  }
  

const corsMiddleware = cors();
app.use(corsMiddleware)
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)



app.use(RouterPaths.blogs, blogsRouter)

app.use(RouterPaths.posts, postsRouter)

app.use(RouterPaths.testing, testingRouter)
app.use(RouterPaths.users, usersRouter)
app.use(RouterPaths.auth, authRouter)


