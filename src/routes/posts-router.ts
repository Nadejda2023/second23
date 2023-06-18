import {Request, Response, Router } from "express";
import {postsRepository} from "../repositories/posts-repository";
import { sendStatus } from "./sendStatus";
import { authorizationValidation, inputPostsValidation, inputValidationErrors } from "../middlewares/inputvalidationmiddleware";
import { db } from "../db/db";
export const postsRouter = Router({})

postsRouter.get('/', (_req: Request, res: Response) => {
    res.status(sendStatus.OK_200).send(db.posts)
  })
  
postsRouter.post('/', 
  authorizationValidation,
  inputPostsValidation.title,
  inputPostsValidation.shortDescription,
  inputPostsValidation.content,
  inputPostsValidation.blogId,
  inputValidationErrors,
(req: Request, res: Response) => {
  const title = req.body.title;
  const shortDescription = req.body.shortDescription;
  const content = req.body.content
  const blogId = req.body.blogId
  const newPost = postsRepository.createPost(title, shortDescription, content, blogId)
    res.status(sendStatus.CREATED_201).send(newPost)


})
  
postsRouter.get('/:id', (req: Request, res: Response) => {
    const foundPost = postsRepository.findPostById(req.params.id)
    if (foundPost) {
      res.status(sendStatus.OK_200).send(foundPost)
    } else {
      res.sendStatus(sendStatus.NOT_FOUND_404)
  }
  })
  
postsRouter.put('/:id', 
authorizationValidation,
inputPostsValidation.title,
inputPostsValidation.shortDescription,
inputPostsValidation.content,
inputPostsValidation.blogId,
inputValidationErrors,
(req: Request, res: Response) => {
  const id = req.params.id;
  const title = req.body.title;
  const shortDescription = req.body.shortDescription;
  const content = req.body.content
  const blogId = req.body.blogId
  const updatePost = postsRepository.updatePost(id, title, shortDescription, content, blogId)
    if (!updatePost) {
      return res.sendStatus(sendStatus.NOT_FOUND_404)
    }
    res.sendStatus(sendStatus.NO_CONTENT_204)
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