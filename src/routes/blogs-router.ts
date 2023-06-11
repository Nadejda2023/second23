import {Request, Response, Router } from "express";
import { DB } from "..";
import {blogsRepository} from "../repositories/blogs-repository";
import { authorizationValidation, inputBlogsValidation, inputValidationErrors } from "../middlewares/inputvalidationmiddleware";
export const blogsRouter = Router({})

const db: DB = {
    blogs: [
        {
            "id": "0",
            "name": "string",
            "description": "string",
            "websiteUrl": "string"
        },

        {
            "id": "1",
            "name": "string",
            "description": "string",
            "websiteUrl": "string"
        }
    ],
    posts: []
}

blogsRouter.get('/', (_req: Request, res: Response) => {
    res.status(200).send(db.blogs)
  })
  
blogsRouter.post('/',
  authorizationValidation,
inputBlogsValidation.name,
inputBlogsValidation.description,
inputBlogsValidation.websiteUrl,
inputValidationErrors, 
(req: Request, res: Response) => {
const name = req.body.name
const description = req.body.description
const websiteUrl = req.body.websiteUrl
const newBlogCreate = blogsRepository.createBlog(name, description, websiteUrl)
  res.status(201).send(newBlogCreate)
})
  
blogsRouter.get('/:id', (req: Request, res: Response) => {
    const foundBlog = blogsRepository.findBlogById(req.params.id)
    if (!foundBlog) {
      res.status(404).send('No blog found')
    } else {
      res.status(200).send(foundBlog)
    }
  })
  
blogsRouter.put('/:id',
  authorizationValidation,
  inputBlogsValidation.name,
  inputBlogsValidation.description,
  inputBlogsValidation.websiteUrl,
  inputValidationErrors,
(_req: Request, _res: Response) => {
  const id = _req.params.id
  const name = _req.params.name
  const description = _req.params.description
  const websiteURL = _req.params.websiteUrl
  const updateBlog = blogsRepository.updateBlog(id, name, description, websiteURL)
    if (!updateBlog) {
      return _res.status(404).send('Not Found')
    }
    _res.status(204).send(updateBlog)
})
  
blogsRouter.delete('/:id', 
authorizationValidation,
inputValidationErrors, 
(req: Request, res: Response) => {
  const foundBlog = blogsRepository.deleteBlog(req.params.id);
  if (!foundBlog) {
    return res.status(404).send('Not found')
  }
res.status(204).send('No Content')
})
