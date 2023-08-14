import {Request, Response, Router } from "express";
import { postsService } from "../domain/posts_service";
import { sendStatus } from "./sendStatus";
import { authorizationValidation, inputValidationErrors } from "../middlewares/inputvalidationmiddleware";
import { db } from "../db/db";
import { createPostValidation} from "../middlewares/postsvalidation";
import { updatePostValidation } from "../middlewares/postsvalidation";
import { PaginatedPost, PostViewDBModel, PostViewInputModel, PostViewModel } from "../models/postsModel";
import { blogsRepository } from "../repositories/blogs_db__repository";
import { blogsQueryRepository } from "../models/queryRepo";
import { getPaginationFromQuery } from "../hellpers/pagination";
export const postsRouter = Router({})

//1
postsRouter.get('/', async (req: Request, res: Response<PaginatedPost<PostViewModel>>) => {
  const pagination = getPaginationFromQuery(req.query)
  const foundPost: PaginatedPost<PostViewModel> = await blogsQueryRepository.findAllPosts(pagination)
  if(!foundPost){
    return res.sendStatus(sendStatus.NOT_FOUND_404)
  } else {
    return res.status(sendStatus.OK_200).send(foundPost)
  }
  
  })

postsRouter.get('/:id', async (req: Request, res: Response<PostViewDBModel| undefined | null>) => {
  const foundPost = await postsService.findPostById(req.params.id)    //req.params.id ////blogId
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
  const newPost : PostViewDBModel | null= await postsService.createPost(title,shortDescription, content, blogId)
    if(!newPost) {
      
      return res.sendStatus(sendStatus.BAD_REQUEST_400 )
  } else {
    
    return res.status(sendStatus.CREATED_201).send(newPost)
  }
}

})
  

postsRouter.put('/:id', 
authorizationValidation,
updatePostValidation,

  async (req: Request , res: Response<boolean | undefined>) => {
    const id = req.params.id
    const { title, shortDescription, content, blogId} = req.body // НАДЯ!!!
    const updatePost = await postsService.updatePost(id, title, shortDescription, content, blogId)

  
    if (!updatePost) {
      return res.sendStatus(sendStatus.NOT_FOUND_404)
    } else {
      return res.sendStatus(sendStatus.NO_CONTENT_204)
    }
})
  
postsRouter.delete('/:id', 
authorizationValidation,
inputValidationErrors,
async (req: Request, res: Response) => {
const foundPost = await postsService.deletePost(req.params.id)
if (!foundPost) {
  return res.sendStatus(sendStatus.NOT_FOUND_404);
  } 
 res.sendStatus(sendStatus.NO_CONTENT_204)
}
)
