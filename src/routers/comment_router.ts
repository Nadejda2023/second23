import { Router, Request, Response} from "express";
import {  createPostValidationC } from "../middlewares/commentInputValidation";
import { commentQueryRepository } from "../repositories/commentQueryRepository";
import { authMiddleware } from "../middlewares/auth-middleware";
import { commentDBViewModel, commentViewModel } from "../models/commentModels";




export const commentRouter = Router({})

commentRouter.put('/:commentId',
authMiddleware,
  createPostValidationC,
  async (req: Request , res: Response) => {
    // нужна проверка с статусом 403
    const user = req.user!
    const commentId = req.params.commentId

    const existingComment = await commentQueryRepository.findCommentById(commentId);
    if (!existingComment) {
        return res.sendStatus(404); 
    }

    if (existingComment.id !== user.id) {
      return res.sendStatus(403); // Forbidden
  }
    
  const updateComment = await commentQueryRepository.updateComment(commentId, req.body.content, req.body.comentatorInfo);

if (updateComment) {
    return res.sendStatus(204); 
    } 
      
})
commentRouter.delete('/:commentId', 
authMiddleware, 
  async (req: Request, res: Response) => {
    const user = req.user!
    const commentId = req.params.commentId
    const comment = await commentQueryRepository.findCommentById(commentId)
    if (!comment) {
      return res.sendStatus(404)
  } else {
      const commentUserId = comment.id
      if (commentUserId !== user.id) {
          return res.sendStatus(403)
      }
  const commentDelete = await commentQueryRepository.deleteComment(req.params.commentId);
  if(commentDelete){
    return res.sendStatus(204)
  }
  
    

  }
}) 

commentRouter.get('/:id', async (req: Request, res: Response<commentDBViewModel| undefined | null>) => {
  
    const foundComment = await commentQueryRepository.findCommentById(req.params.commentId)    
      if (foundComment) {
        return res.status(200).send(foundComment)
        
      } else {
        
        return res.sendStatus(404)
    }
    })