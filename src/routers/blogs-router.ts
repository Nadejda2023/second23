  import {Request, Response, Router } from "express";
import { blogsRepository, } from '../repositories/blogs-db--repository';
import { sendStatus } from "./sendStatus";
import { authorizationValidation, inputValidationErrors } from "../middlewares/inputvalidationmiddleware";

import { CreateBlogValidation , UpdateBlogValidation } from "../middlewares/blogsvalidation";
import { BlogsInputViewModel, BlogsViewDBModel, BlogsViewModel } from "../models/blogsModel";

export const blogsRouter = Router({})

blogsRouter.get('/', async (req: Request, res: Response<BlogsViewModel[]>) => {
    const foundBlogs = await blogsRepository.findAllBlogs(req.query.title?.toString())
    
    res.status(sendStatus.OK_200).send(foundBlogs)
  })
  
blogsRouter.get('/:id', async (req: Request, res: Response<BlogsViewDBModel | null>) => {
    const foundBlog: BlogsViewDBModel | null = await blogsRepository.findBlogById(req.params.id)
    if (foundBlog) {
      return res.status(sendStatus.OK_200).send(foundBlog)
    } else {
      return res.sendStatus(sendStatus.NOT_FOUND_404)
    }
})

blogsRouter.post('/',
  authorizationValidation,
  ...CreateBlogValidation,
  async (req: Request <BlogsInputViewModel>, res: Response<BlogsViewDBModel | null >) => {
    const { name, description, websiteUrl} = req.body
  const newBlog : BlogsViewDBModel| null  = await blogsRepository.createBlog(name, description, websiteUrl)
  console.log(newBlog);
  
  res.status(sendStatus.CREATED_201).send(newBlog)
})
  

  
blogsRouter.put('/:id',
  authorizationValidation,
  ...UpdateBlogValidation,
  async (req: Request <BlogsInputViewModel>, res: Response <BlogsViewModel | boolean>) => {
  const { id, name, description, websiteUrl} = req.body
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
})