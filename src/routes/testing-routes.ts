import { Request, Router ,Response } from "express";
import { db } from "./blogs-router";
import { blogRepository } from "../repositories/blogs-repository";
import { postRepository } from "../repositories/posts-repository";
export const testingRouter = Router ({})
//yfi

//testingRouter.delete('/all-data', (req, res) => {
//blogRepository.testingDeleteAllBlogs()
//postRepository.testingDeleteAllPosts()
   // res.status(204)
 // });