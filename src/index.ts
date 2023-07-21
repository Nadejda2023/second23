import { db, runDB } from "./db/db";
import * as dotenv from 'dotenv';
dotenv.config()

import  express from 'express'
import cors from 'cors'
import { blogsRouter } from './routers/blogs-router';
import { postsRouter } from './routers/posts-router';
import {testingRouter } from './routers/testing-router';

import { PostViewModel } from "./models/postsModel";
import { BlogsViewModel } from "./models/blogsModel";


export const app =  express()

const corsMiddleware = cors();
app.use(corsMiddleware)
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)
const port = process.env.PORT || 3338



export type DB = {
  blogs: BlogsViewModel[]
  posts: PostViewModel[]
}
app.use('/blogs', blogsRouter)

app.use('/posts', postsRouter)

app.use('/testing', testingRouter)

const startApp = async () => {
  await runDB()
app.listen(port, () => {
  console.log(`Listen ${port}`)
})
}
startApp()





