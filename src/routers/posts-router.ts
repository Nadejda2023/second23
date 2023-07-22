import {Request, Response, Router } from "express";
import { postsRepository } from "../repositories/posts-db--repository";
import { sendStatus } from "./sendStatus";
import { authorizationValidation, inputValidationErrors } from "../middlewares/inputvalidationmiddleware";
import { db } from "../db/db";
import { createPostValidation} from "../middlewares/postsvalidation";
import { updatePostValidation } from "../middlewares/postsvalidation";
import { PostViewDBModel, PostViewInputModel, PostViewModel } from "../models/postsModel";
import { blogsRepository } from "../repositories/blogs-db--repository";
export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response<PostViewDBModel[] | undefined | null>) => {
  const foundPost = await postsRepository.findAllPosts()
  res.status(sendStatus.OK_200).send(foundPost)
  })

postsRouter.get('/:id', async (req: Request, res: Response<PostViewDBModel| undefined | null>) => {
  const foundPost=   await postsRepository.findPostById(req.params.id)    //req.params.id
    if (!foundPost) {
      return res.sendStatus(sendStatus.NOT_FOUND_404)
    } else {
      return res.status(sendStatus.OK_200).send(foundPost)
  }
  })
  
postsRouter.post('/', 
  authorizationValidation,
  createPostValidation,
async (req: Request, res: Response<PostViewDBModel| undefined | null>) => {
  const findBlogById =  await blogsRepository.findBlogById(req.body.blogId)
  
  if (findBlogById) {
    const { title ,shortDescription, content, blogId} = req.body
  const newPost : PostViewDBModel | null= await postsRepository.createPost(title,shortDescription, content, blogId)

  
    return res.status(sendStatus.CREATED_201).send(newPost)
  } else {
    return res.sendStatus(sendStatus.BAD_REQUEST_400 )
  }

}) 
  

postsRouter.put('/:id', 
authorizationValidation,
updatePostValidation,

  async (req: Request , res: Response<boolean | undefined>) => {
    const id = req.params.id
    const { title, shortDescription, content, blogId} = req.body
    const updatePost = await postsRepository.updatePost(id, title, shortDescription, content, blogId)

  
    if (!updatePost) {
      return res.sendStatus(sendStatus.NOT_FOUND_404)
    } else {
      return res.sendStatus(sendStatus.NO_CONTENT_204)
    }
})
  
postsRouter.delete('/:id', 
authorizationValidation,
async (req: Request, res: Response) => {
const foundPost = await postsRepository.deletePost(req.params.id)
if (!foundPost) {
  return res.sendStatus(sendStatus.NOT_FOUND_404);
  }
  return res.sendStatus(sendStatus.NO_CONTENT_204)
})