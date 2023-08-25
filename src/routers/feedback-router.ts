
import {Response, Request, NextFunction, Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware"
import { authorizationValidation } from "../middlewares/inputvalidationmiddleware"
import { feedbackService } from "../domain/feedbackService";



export const feedbacksRouter = Router({})

feedbacksRouter.post ('/', authMiddleware,
async (req, res) => {
    //@ts-ignore
     const result = await feedbackService.sendFeedback(req.body.comment, req.userId!)
     res.status(201).send(result)
})
feedbacksRouter.get('/', async (req, res) => {
    const users = await feedbackService
    .allFeedbacks()
    res.send(users)
})