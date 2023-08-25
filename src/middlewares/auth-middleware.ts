import {Response, Request, NextFunction } from "express";
import { usersService } from "../domain/users-service";
import { jwtService } from "../_application/jwt-service";
import { UsersModel } from "../models/usersModel";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization) {
        res.send(401)
        return
    }


const token = req.headers.authorization.split(' ')[1]

const userId = await jwtService.getUserIdByToken(token)
if (!userId) {
    res.sendStatus(401)
    return  
}
const user = await usersService.findUserById(userId.toString())
if(!user) {
    res.sendStatus(401)
    return
}
//@ts-ignore
 req.userId = user.id
    next()
    

}