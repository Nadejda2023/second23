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
blogsRouter.delete(':id', (req, res) => {
  const deleteallBlogs = blogRepository.testingDeleteAllBlogs()
  res.sendStatus(204).send
  })

blogsRouter.get('/', (req, res) => {
    const allblogs = blogRepository.findAllBlogs()
    res.sendStatus(200).send(allblogs)
  })
  
blogsRouter.get('/:id', (req: Request, res: Response) => {
    const blog = blogRepository.getBlogById(req.params.id);
    if (!blog) { 
      res.sendStatus(404)
       
    return
      
    }
    res.status(200).send(blog) 
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

      blogsRouter.delete("/posts/:id",
      bAuthMiddleware,
    (req: Request, res: Response) => {
      let findPostID = db.blogs.find(p => +p.id === +req.params.id)

      if(findPostID) {
        for (let i = 0; i < db.blogs.length; i++) {
          if(+db.blogs[i].id === +req.params.id) {
            db.blogs.splice(i,1);
            res.send(204)
            return;
          }
        }
      }
    })
