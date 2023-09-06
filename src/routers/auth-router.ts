import {Request, Response, Router} from 'express'
import { usersService } from '../domain/users-service'
import { jwtService } from '../_application/jwt-service'
import { authMiddleware } from '../middlewares/auth-middleware'
import { authService } from '../domain/auth-service'
import { UsersInputValidation, emailConfiResValidation, emailValidation, registrationComfiValidation } from '../middlewares/usersvalidation'
import { inputValidationErrors } from '../middlewares/inputvalidationmiddleware'


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
 ...UsersInputValidation,
 //registrationComfiValidation,
 async (req: Request, res: Response) => {
    
    const user = await usersService.createUser(req.body.login, req.body.email, req.body.password)
    //console.log('router:', user)
    if(user) {
    return res.sendStatus(204)
    } else {
        return res.sendStatus(500)   
    }
 })

 

 authRouter.post('/registration-confirmation',
 registrationComfiValidation,
 async (req: Request, res: Response) => {
     const result = await authService.confirmEmail(req.body.code)
     if(result) {
        res.status(201).send()
     } else {
        res.sendStatus(400)
     }
 })


 authRouter.post('/registration-email-resending',
 //val
 emailConfiResValidation,
 async (req: Request, res: Response) => {
    const result = await authService.confirmEmail(req.body.email)
    if(result) {
        return res.sendStatus(204)
        } else {
            return res.sendStatus(500)   
        }
    
    })