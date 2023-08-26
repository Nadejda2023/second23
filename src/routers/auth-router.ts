import {Request, Response, Router} from 'express'
import { usersService } from '../domain/users-service'
import { authorizationValidation, inputValidationErrors } from '../middlewares/inputvalidationmiddleware'
import { UsersInputValidation } from '../middlewares/usersvalidation'

import { jwtService } from '../_application/jwt-service'
import { UsersModel, UsersModelSw } from '../models/usersModel'
import { authQueryRepository } from '../repositories/auth_repository'
import { AuthViewModel } from '../models/authModels'
import { authMiddleware } from '../middlewares/auth-middleware'
import { WithId } from 'mongodb'


export const authRouter = Router({})

/* 04 hw 
authRouter.post('/login',
loginPasswordValidation,//validation
async ( req: Request, res: Response) => {
    const checkResult = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
    if (!checkResult) {
        res.sendStatus(401)
        return
    } else {
        res.sendStatus(204)
    }
}), 
*/

authRouter.post('/login',

async ( req: Request, res: Response) => {
    const user = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
    if (user) {
        const token = await jwtService.createJWT(user) 
        res.status(200).send({accessToken: token})
        
    } else {
        res.sendStatus(401)
    }

})
authRouter.get('/me', 

async (req: Request, res: Response) => {
    const foundMe: WithId<AuthViewModel> | null = await authQueryRepository.findMe()
  if(!foundMe){
    return res.sendStatus(404)
  } else {
    return res.status(200).send(foundMe)
  }
 })