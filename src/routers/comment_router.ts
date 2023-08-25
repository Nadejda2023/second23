import { Router, Request, Response} from "express";
import { authorizationValidation } from "../middlewares/inputvalidationmiddleware";
import {  createPostValidationC } from "../middlewares/commentInputValidation";
import { commentQueryRepository } from "../repositories/commentQueryRepository";
import { authMiddleware } from "../middlewares/auth-middleware";
import { commentViewModel } from "../models/commentModels";
import jwt from 'jsonwebtoken';



export const commentRouter = Router({})

commentRouter.put('/:commentId',
authMiddleware,
  ...createPostValidationC,
  async (req: Request , res: Response <boolean | undefined>) => {
    /*const commentId = req.params.id
    const { content, comentatorInfo, userId, userLogin} = req.body
    const updateComment = await commentQueryRepository.updateComment(commentId, req.body.content, req.body.comentatorInfo, req.body.userId, req.body.userLogin  )
    if (updateComment) {
      return res.sendStatus(204)
      
    } else {
      return res.sendStatus(404)
    } 
    

})*/
const commentId = req.params.commentId;
    const { content, comentatorInfo, userId, userLogin } = req.body;

    // Получаем токен из заголовка Authorization
    const token = req.headers.authorization?.split(' ')[1];
    const jwtSecretKey = "123";
    if (!token) {
        return res.sendStatus(401)
    }

    try {
        // Проверяем и декодируем токен
        const decodedToken = jwt.verify(token, jwtSecretKey) as { userId: string };

        if (decodedToken.userId !== userId) {
            return res.sendStatus(403)
        }

        // Выполняем валидацию и обновление комментария
        const updateComment = await commentQueryRepository.updateComment(commentId, content, comentatorInfo, userId, userLogin);

        if (updateComment) {
            return res.sendStatus(204);
        } else {
            return res.sendStatus(404);
        }
    } catch (error) {
        
    }
})
commentRouter.delete('/:commentId', 
authMiddleware, 
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