import { Request, Response, NextFunction} from "express";
import { header,body } from "express-validator";
import { usersRepository } from "../repositories/users-repository";
import { validationResult } from "express-validator";
import { blogsRepository } from "../repositories/blogs-repository";
import { ValidationError} from "express-validator";


export const authorizationValidation = header('authorization').
 custom(value => {
  if (!usersRepository.find(u => u.loginPass === value)) {
  throw new Error('401');
 }
 return true
 })
 export const inputBlogsValidation = {
  name: body('name')
  .trim().isString().withMessage('Must be a string')
  .isLength({min:1, max: 15}).withMessage('Length  must be from 1 to 15'),
  description: body('description')
  .trim().isString().withMessage('Must be a string')
  .isLength({min:1, max: 500}).withMessage('Length  must be from 1 to 500'),
  websiteUrl: body('websiteUrl')
  .isURL().withMessage('Must be URL')
 }

export const inputPostsValidation = {
  title: body('title')
  .trim().isString().withMessage('Must be a string')
  .isLength({min:1, max: 30}).withMessage('Length  must be from 1 to 30'),
  shortDescription: body('shortDescription')
  .trim().isString().withMessage('Must be a string')
  .isLength({min:1, max: 100}).withMessage('Length  must be from 1 to 100'),
  content: body('content')
  .trim().isString().withMessage('Must be a string')
  .isLength({min:1, max: 1000}).withMessage('Length  must be from 1 to 1000'),
  blogId: body('blogId')
  .trim().isString().withMessage('Must be a string')
  .isLength({min:1, max: 100}).withMessage('Length  must be from 1 to 100')
  .custom(value => {
    if (!blogsRepository.findBlogById(value)) {
      throw new Error('Blog is not found');
    }
    return true;
  })


}


 export const inputValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorFormat = (error : ValidationError) => {
    return {message: error.msg, field: error.msg}

  }
const errors = validationResult(req).formatWith(errorFormat)
  if(!errors.isEmpty()) {
      if (errors.array().find(e => e.message === '401')) {
              return res.sendStatus(401)
          }
          res.sendStatus(400)
          .json({errorsmessage: errors.array()})
     return  
  } else {
      next()
  }

  
}
   

