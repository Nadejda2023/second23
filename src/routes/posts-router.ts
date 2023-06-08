import { Request, Router ,Response } from "express";
export const postsRouter = Router ({})
import { postRepository } from "../repositories/posts-repository";
import { bAuthMiddleware } from "../middlewares/authvalidation";
import { postInputValidationMiddleware } from "../middlewares/postinputmiddleware";
import { errorValidationMiddleware } from "../middlewares/resultvalidation";
import { postIdFoundMiddleware } from "../middlewares/postinputmiddleware";
import { postBlogNameValidationMiddleware } from "../middlewares/postinputmiddleware";


export type postsType = {
    
      id: string,
      title: string,
      shortDescription: string,
      content: string,
      blogId: string,
      blogName: string
    
  

}


export type DB = {
  posts : postsType[]
}

export const db: DB = {
  posts : [
    {
      "id": "01",
      "title": "string",
      "shortDescription": "string",
      "content": "string",
      "blogId": "1",
      "blogName": "string"
    },
      {
        "id": "02",
        "title": "string",
        "shortDescription": "string",
        "content": "string",
        "blogId": "2",
        "blogName": "string"
      }
    ]
  
      
  }


    postsRouter.get('/', (req, res) => {
        res.status(200).send(db.posts)
      })
      
      postsRouter.get('/ :id', (req: Request, res: Response) => {
          const blog = postRepository.getPostById;
          if (blog) { 
             res.status(200).send(blog) 
          } else {
            res.sendStatus(404)
          }
          return
        })
      
      postsRouter.post("/:id",
      //bAuthMiddleware,
      postInputValidationMiddleware,
      postIdFoundMiddleware,
      postBlogNameValidationMiddleware,
      errorValidationMiddleware,
      // здесь перечислить все мидлв через запятную
      (req: Request, res: Response) => {
        try {
        const title = req.body.title
          const shortDescription =req.body.shortDescription
          const content = req.body.content
          const blogId = req.body.blogId
          const blogName = req.body.blogName
          const newPost = postRepository.createPost(
            title,
            shortDescription,
            content,
            blogId,
            blogName
          )
          res.sendStatus(201).send(newPost)
        } catch (e) {
          console.log(e);
          return res.sendStatus(400)
        }
      })
          

    
       
    postsRouter.put("/:id",
    //bAuthMiddleware,
    postInputValidationMiddleware,
    postIdFoundMiddleware,
    errorValidationMiddleware,
    (req: Request, res: Response) => {
      const isUpBlog = postRepository.updatePosts;
        if (!isUpBlog) {
          const updatedBlog = postRepository.getPostById(req.body.id);
          res.status(204).json(updatedBlog);
        } else {

          res.sendStatus(404); 
        
        }
      })
      postsRouter.delete("/:id",
      //bAuthMiddleware,
      postInputValidationMiddleware,
      postIdFoundMiddleware,
    errorValidationMiddleware,
    (req: Request, res: Response) => {
      const deletePost = postRepository.deletePosts(req.body.id);
      res.status(204).json(deletePost);
      return;
    }
      
      )

      
    