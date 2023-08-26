import { Router, Request, Response} from "express";
import {  createPostValidationC } from "../middlewares/commentInputValidation";
import { commentQueryRepository } from "../repositories/commentQueryRepository";
import { authMiddleware } from "../middlewares/auth-middleware";
import { commentViewModel } from "../models/commentModels";




export const commentRouter = Router({})

commentRouter.put('/:commentId',
//authMiddleware,
  //...createPostValidationC,
  async (req: Request , res: Response <boolean | undefined>) => {
    // нужна проверка с статусом 403
    const commentId = req.params.commentId
    const { content, comentatorInfo, userId, userLogin} = req.body
    const updateComment = await commentQueryRepository.updateComment(commentId, req.body.content, req.body.comentatorInfo, req.body.userId, req.body.userLogin  )
    if (updateComment) {
      return res.sendStatus(204)
      
    } else {
      return res.sendStatus(404)
    } 
      
})
commentRouter.delete('/:commentId', 
//authMiddleware, 
  async (req: Request, res: Response) => {
  const foundComment= await commentQueryRepository.deleteComment(req.params.commentId);
  if (!foundComment) {
    return  res.sendStatus(404)
  } else {
  return res.sendStatus(204)
  }
}) 

commentRouter.get('/:commentId', async (req: Request, res: Response<commentViewModel| undefined | null>) => {
  
    const foundComment = await commentQueryRepository.findComentById(req.params.commentId)    
      if (foundComment) {
        return res.status(200).send(foundComment)
        
      } else {
        
        return res.sendStatus(404)
    }
    })