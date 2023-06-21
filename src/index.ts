import { db } from "./db/db";


import  express from 'express'
import cors from 'cors'
import { blogsRouter } from './routers/blogs-router';
import { postsRouter } from './routers/posts-router';
import {testingRouter } from './routers/testing-router';

export const app = express()
const corsMiddleware = cors();
app.use(corsMiddleware)
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)
const port = process.env.PORT || 3003


export type blogsType = {
  id: string,
  name: string,
  description: string,
  websiteUrl: string, 
}

export type postsType = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
}

export type DB = {
  blogs: blogsType[]
  posts: postsType[]
}
app.use('/blogs', blogsRouter)

app.use('/posts', postsRouter)

app.use('/testing', testingRouter)

app.listen(port, () => {
  console.log(`Listen ${port}`)
})





/*
export const db : DB = {
  blogs: [
  {
    id: "ts",
    name: "yurii",
    description: "string",
    websiteUrl: "string"
  },
  {
    id: "js",
    name: "string",
    description: "string",
    websiteUrl: "string"
    }
  ],
  posts: [    
  {
    id: "Leva",
    title: "First steps",
    shortDescription: "string",
    content: "string",
    blogId: "0",
    blogName: "string"
},

  {
    id: "Platon",
    title: "First words",
    shortDescription: "string",
    content: "string",
    blogId: "1",
    blogName: "string"
  }]
};
*/