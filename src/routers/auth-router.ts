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
import { authService } from '../domain/auth-service'


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
//to do
authMiddleware,
async (req: Request, res: Response) => {
  if(!req.user){
    return res.sendStatus(401)
  } else {
    return res.status(200).send({
        email: req.user.email,
        login: req.user.login,
        userId: req.user.id
    }
        )
  }
 })

 // from 07
 authRouter.post('/registration',
 async (req: Request, res: Response) => {
    const user = await authService.createUser(req.body.login, req.body.email, req.body.password)
    if(user) {
    res.status(201).send()
    } else {
        res.status(400).send({})   
    }
 })

 

 authRouter.post('/registration-confirmation',
 async (req: Request, res: Response) => {
     const result = await authService.confirmEmail(req.body.code)
     if(result) {
        res.status(201).send()
     } else {
        res.sendStatus(400)
     }
 })

 authRouter.post('/registration-email-resending',
 async (req: Request, res: Response) => {
    //const result = await authService.confirmEmail(req.body.email)
    //if (result) {
       // res.status(204).send()
        //}else{
    //res.sendStatus(400)
    //}
    })