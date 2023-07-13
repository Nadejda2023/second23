import {Request, Response, Router } from "express";
import { blogsRepository, } from '../repositories/blogs-db1-repository';
import { sendStatus } from "./sendStatus";
import { authorizationValidation, inputValidationErrors } from "../middlewares/inputvalidationmiddleware";
import { db } from "../db/db";
import { CreateBlogValidation , UpdateBlogValidation } from "../middlewares/blogsvalidation";
import { BlogsInputViewModel, BlogsViewModel } from "../models/blogsModel";
import { blogsType } from "..";
export const blogsRouter = Router({})

blogsRouter.get('/', (req: Request, res: Response<BlogsViewModel[]>) => {
    console.log(db.blogs);
    
    res.status(sendStatus.OK_200).send()
  })
  /*
blogsRouter.get('/:id', async (req: Request, res: Response<BlogsViewModel[]>) => {
    const foundBlog = await blogsRepository.findBlogById(req.params.id)
    if (foundBlog) {
      res.status(sendStatus.OK_200).send(foundBlog)
    } else {
      res.sendStatus(sendStatus.NOT_FOUND_404)
    }
})

blogsRouter.post('/',
  authorizationValidation,
  ...CreateBlogValidation,
  async (req: Request <BlogsInputViewModel>, res: Response<BlogsViewModel>) => {
    const { name, description, websiteUrl} = req.body
  const newBlog:BlogsViewModel = await blogsRepository.createBlog(name, description, websiteUrl)
  console.log(newBlog);
  
  res.status(sendStatus.CREATED_201).send(newBlog)
})
  

  
blogsRouter.put('/:id',
  authorizationValidation,
  ...UpdateBlogValidation,
  async (req: Request, res: Response) => {
  const id = req.params.id
  const name = req.body.name  //body
  const description = req.body.description
  const websiteUrl = req.body.websiteUrl
  const updateBlog = await blogsRepository.updateBlog(id, name, description, websiteUrl)
    if (!updateBlog) {
      return res.sendStatus(sendStatus.NOT_FOUND_404)
    }
    res.sendStatus(sendStatus.NO_CONTENT_204)
})
  
blogsRouter.delete('/:id', 
  authorizationValidation,
  inputValidationErrors, 
  async (req: Request, res: Response) => {
  const foundBlog = await blogsRepository.deleteBlog(req.params.id);
  if (!foundBlog) {
    return res.sendStatus(sendStatus.NOT_FOUND_404)
  }
  res.sendStatus(sendStatus.NO_CONTENT_204)
})*/