import {Request, Response, Router } from "express";
import { DB } from "..";
import {postsRepository} from "../repositories/posts-repository";
import { authorizationValidation, inputPostsValidation, inputValidationErrors } from "../middlewares/inputvalidationmiddleware";
export const postsRouter = Router({})


const db: DB = {
    posts: [
        {
            "id": "Leva",
            "title": "First steps",
            "shortDescription": "string",
            "content": "string",
            "blogId": "string",
            "blogName": "string"
        },

        {
            "id": "Platon",
            "title": "First words",
            "shortDescription": "string",
            "content": "string",
            "blogId": "string",
            "blogName": "string"
        }
    ],
    blogs: []
}
postsRouter.get('/', (_req: Request, res: Response) => {
    res.status(200).send(db.posts)
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
    res.status(201).send(newPost)


})
  
postsRouter.get('/:id', (req: Request, res: Response) => {
    const foundPost = postsRepository.findPostById(req.params.id)
    if (foundPost) {
      res.status(200).send('Ok')
    } else {
      res.status(404).send('Not Found')
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
  const id = req.body.id;
  const title = req.body.title;
  const shortDescription = req.body.shortDescription;
  const content = req.body.content
  const blogId = req.body.blogId
  const updatePost = postsRepository.updatePost(id, title, shortDescription, content, blogId)
    if (!updatePost) {
      return res.status(404).send('Not found')
    }
    res.status(204).send('No content')
})
  
postsRouter.delete('/:id', 
authorizationValidation,
inputValidationErrors,
(req: Request, res: Response) => {
const foundPost = postsRepository.deletePost(req.params.id)
if (!foundPost) {
  return res.status(404).send('Not Found');
  }
res.status(204).send('No content')
})