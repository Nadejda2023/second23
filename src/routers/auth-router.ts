import {Request, Response, Router} from 'express'
import { usersService } from '../domain/users-service'
import { authorizationValidation } from '../middlewares/inputvalidationmiddleware'


export const authRouter = Router({})

authRouter.post('/login',
authorizationValidation,//validation
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