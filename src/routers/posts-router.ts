import {Request, Response, Router } from "express";
import {postsRepository} from "../repositories/posts-repository";
import { sendStatus } from "./sendStatus";
import { authorizationValidation, inputValidationErrors } from "../middlewares/inputvalidationmiddleware";
import { db } from "../db/db";
import { createPostValidation} from "../middlewares/postsvalidation";
import { updatePostValidation } from "../middlewares/postsvalidation";
export const postsRouter = Router({})

postsRouter.get('/', (_req: Request, res: Response) => {
    res.status(sendStatus.OK_200).send(db.posts)
  })

postsRouter.get('/:id', (req: Request, res: Response) => {
  const foundPost = postsRepository.findPostById(req.params.id)    //req.params.id
    if (!foundPost) {
      res.sendStatus(sendStatus.NOT_FOUND_404)
    } else {
       res.status(sendStatus.OK_200).send(foundPost)
  }
  })
  
postsRouter.post('/', 
  authorizationValidation,
  createPostValidation,
(req: Request, res: Response) => {
  const findBlogById = db.blogs.find((blog: { id: any; }) => blog.id === req.body.blogId)
  if (findBlogById) {
  const newPost = postsRepository.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
  
/*
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    content: req.body.content
    blogId: req.body.blogId
  */
    return res.status(sendStatus.CREATED_201).send(newPost)
  } else {
    return res.sendStatus(sendStatus.BAD_REQUEST_400 )
  }

})
  

postsRouter.put('/:id', 
authorizationValidation,
updatePostValidation,
(req: Request, res: Response) => {
  const updatePost = postsRepository.updatePost(
    req.params.id, 
    req.body.title,
    req.body.shortDescription, 
    req.body.content, 
    req.body.blogId)
/*
  const id = req.params.id;
  const title = req.body.title;
  const shortDescription = req.body.shortDescription;
  const content = req.body.content
  const blogId = req.body.blogId
  const updatePost = postsRepository.updatePost(id, title, shortDescription, content, blogId)
*/
    if (!updatePost) {
      return res.sendStatus(sendStatus.NOT_FOUND_404)
    } else {
    res.sendStatus(sendStatus.NO_CONTENT_204).json(updatePost)
    }
})
  
postsRouter.delete('/:id', 
authorizationValidation,
inputValidationErrors,
(req: Request, res: Response) => {
const foundPost = postsRepository.deletePost(req.params.id)
if (!foundPost) {
  return res.sendStatus(sendStatus.NOT_FOUND_404);
  }
res.sendStatus(sendStatus.NO_CONTENT_204)
})