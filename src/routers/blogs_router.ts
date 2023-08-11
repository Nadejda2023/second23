import {Request, Response, Router } from "express";



import { CreateBlogValidation , UpdateBlogValidation } from "../middlewares/blogsvalidation";
import { BlogsViewDBModel, BlogsViewModel, PaginatedBlog } from "../models/blogsModel";
import { blogsService } from "../domain/blogs_service";
import { sendStatus } from "./sendStatus";
import { authorizationValidation, inputValidationErrors } from "../middlewares/inputvalidationmiddleware";
import { blogsQueryRepository } from "../models/queryRepo";
import { blogsRepository } from "../repositories/blogs_db__repository";
import { PaginatedPost, PostViewModel } from "../models/postsModel";
import { createPostValidation, createPostValidationForBlogRouter } from "../middlewares/postsvalidation";
import { getPaginationFromQuery} from "../hellpers/pagination";


export const blogsRouter = Router({})
//1
blogsRouter.get('/', async (req: Request, res: Response) : Promise<void> => {
  const pagination = getPaginationFromQuery(req.query)
    const foundBlogs:PaginatedBlog<BlogsViewModel> = await blogsQueryRepository.findBlogs(pagination)
    
    res.status(sendStatus.OK_200).send(foundBlogs)
  })
  

blogsRouter.post('/',
  authorizationValidation,
  ...CreateBlogValidation,
  async (req: Request , res: Response<BlogsViewDBModel | null >)  => {
    const { name, description, websiteUrl} = req.body
  const newBlog : BlogsViewDBModel| null  = await blogsService.createBlog(name, description, websiteUrl)
  console.log(newBlog);
  
  res.status(sendStatus.CREATED_201).send(newBlog)
  
})
  
//2
blogsRouter.get('/:blogId/posts', async (req: Request, res: Response): Promise<void> => { /// jn async and for end function create new middleware
const blogPost:BlogsViewModel | null = await blogsRepository.findBlogById(req.params.blogId)
if(!blogPost) {
  res.sendStatus(404)
  return
 }
 const pagination = getPaginationFromQuery(req.query)
  const BlogsFindPosts: PaginatedPost<PostViewModel> = await blogsQueryRepository.findPostForBlog(pagination)
  if(BlogsFindPosts) {
    res.status(200).send(BlogsFindPosts)
    return
   }
})

//3
blogsRouter.post('/:blogId/posts',authorizationValidation, createPostValidationForBlogRouter, async (req: Request, res: Response): Promise<void> => { /// jn async and for end function create new middleware
  const blogWithId: BlogsViewModel| null = await blogsRepository.findBlogById(req.params.blogId)
  if(!blogWithId) {
    res.sendStatus(404)
    return
   }
  
    const blogsCreatePost: PostViewModel | null = await blogsQueryRepository.createPostForBlog(req.body.title, req.body.shortDescription, req.body.content, req.params.blogId)
    if(blogsCreatePost) {
      res.status(201).send(blogsCreatePost)
      return
     }
  })

  blogsRouter.get('/:id', async (req: Request, res: Response<BlogsViewModel| null>) => {
    const foundBlog: BlogsViewModel | null = await blogsService.findBlogById(req.params.id)
    if (!foundBlog) {
      return res.sendStatus(sendStatus.NOT_FOUND_404)
      
    } else {
      return res.status(sendStatus.OK_200).send(foundBlog)
    }
})
  
blogsRouter.put('/:id',
  authorizationValidation,
  ...UpdateBlogValidation,
  async (req: Request , res: Response <boolean | undefined>) => {
    const id = req.params.id
    const { name, description, websiteUrl} = req.body

    const updateBlog = await blogsService.updateBlog(id, name, description, websiteUrl)
    if (updateBlog) {
      return res.sendStatus(sendStatus.NO_CONTENT_204)
      
    } else {
      return res.sendStatus(sendStatus.NOT_FOUND_404)
    }
})
  
blogsRouter.delete('/:id', 
  authorizationValidation,
  inputValidationErrors, 
  async (req: Request, res: Response) => {
  const foundBlog = await blogsService.deleteBlog(req.params.id);
  if (!foundBlog) {
    return res.sendStatus(sendStatus.NOT_FOUND_404)
  }
  res.sendStatus(sendStatus.NO_CONTENT_204)
}) 