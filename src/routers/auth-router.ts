import {Request, Response, Router} from 'express'
import { usersService } from '../domain/users-service'
import { authorizationValidation, inputValidationErrors } from '../middlewares/inputvalidationmiddleware'
import { UsersInputValidation } from '../middlewares/usersvalidation'


export const authRouter = Router({})

authRouter.post('/login',
UsersInputValidation,//validation
async ( req: Request, res: Response) => {
    const checkResult = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
    if (!checkResult) {
        res.sendStatus(401)
        return
    } else {
        res.sendStatus(204)
    }
}

)