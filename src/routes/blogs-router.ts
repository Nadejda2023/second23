import { Request, Router ,Response } from "express";
import { blogRepository } from "../repositories/blogs-repository";
import { bAuthMiddleware } from "../middlewares/authvalidation";
import { blogInputValidationMiddleware } from "../middlewares/blogsinputvalidation";
import { blogIdFoundMiddleware } from "../middlewares/blogidvalidation";
import { errorValidationMiddleware } from "../middlewares/resultvalidation";


export const blogsRouter = Router ({})
export type blogsType = {
  
  id: string,
  name: string,
  description: string,
  websiteUrl: string
   
}

export type DB = {
  blogs : blogsType[]
}

export const db: DB = {
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

  ]
}


blogsRouter.get('/', (req, res) => {
    res.status(200).send(blogRepository.findAllBlogs())
  })
  
blogsRouter.get('/:id', (req: Request, res: Response) => {
    const blog = blogRepository.getBlogById(req.params.id);
    if (blog) { 
       res.status(200).send(blog) 
    } else {
      res.sendStatus(404)
    }
    return
  })

  blogsRouter.post('/', 
  bAuthMiddleware,
  blogInputValidationMiddleware,
  errorValidationMiddleware,
  (req: Request, res: Response) => {
    const newBlog = blogRepository.createBlogs
    res.status(201).send(newBlog);
    return;
  
  }
)

    blogsRouter.put("/:id",
    bAuthMiddleware,
    blogIdFoundMiddleware,
    blogInputValidationMiddleware,
    errorValidationMiddleware,
    (req: Request, res: Response) => {
      const isUpBlog = blogRepository.updateBlogs;
        if (!isUpBlog) {
          const updatedBlog = blogRepository.getBlogById(req.body.id);
          res.status(204).json(updatedBlog);
        } else {

          res.sendStatus(404); 
        
        }
      })

      blogsRouter.delete("/:id",
      bAuthMiddleware,
    blogIdFoundMiddleware,
    blogInputValidationMiddleware,
    errorValidationMiddleware,
    (req: Request, res: Response) => {
      const deleteBlog = blogRepository.deleteBlogs(req.body.id);
      res.status(204).json(deleteBlog);
      return;
    }
      )
