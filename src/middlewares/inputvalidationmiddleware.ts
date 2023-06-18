import {NextFunction, Response, Request } from "express";
import { header, body, validationResult, ValidationError} from 'express-validator';
import { blogsRepository} from '../repositories/blogs-repository';
import { usersRepository } from "../repositories/users-repository";
import {sendStatus} from "../routes/sendStatus";
import { error } from "console";



export const authorizationValidation = header('authorization').custom((value) => {
    const user = usersRepository.find(user => user.loginPassword === value)
    
    if (!user) {
        throw new Error('UNAUTHORIZED_401');
    }
    return true
})

export const inputBlogsValidation = {
    name: body('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('name empty')
        .isLength({min: 1, max: 15})
        .withMessage('Length must be from 1 to 15 simbols'),
    description: body('description')
        .trim()
        .not()
        .isEmpty()
        .withMessage('description')
        .isLength({min: 1, max: 500})
        .withMessage('Length must be from 1 to 500 simbols'),
    websiteURL: body('websiteUrl')
        .isURL()
        .withMessage('Must be a Url')
        .isLength({min: 1, max: 100})
        .withMessage('Length websiteUrl must be from 1 to 100 simbols'),

}
export const inputPostsValidation = {
    title: body('title')
    .trim()
    .isString()
    .withMessage('Must be string')
    .isLength({min: 1, max: 30})
    .withMessage('Length must be from 1 to 30 simbols'),
shortDescription: body('shortDescription')
    .trim()
    .isString()
    .withMessage('Must be string')
    .isLength({min: 1, max: 100})
    .withMessage('Length description incorrect'),
content: body('content')
    .trim()
    .isString()
    .withMessage('Must be string')
    .isLength({min: 1, max: 1000})
    .withMessage('Length must be from 1 to 1000 simbols'),
blogId: body('blogID')
    .trim()
    .isString()
    .withMessage('Must be string')
    .isLength({min: 1, max: 100})
    .withMessage('Length Id incorrect')
    .custom((value: any) => {
        if (!blogsRepository.findBlogById(value)) {
            throw new Error('Blog is not found');
        }
        return true;
        })
    }

    export const inputValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    

    
    const errorFormatter = ({msg, param}: any) => {
        return {message: msg, field: param};
    };
    const errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
       res.status(400).json({ errorsMessages: errors.array({onlyFirstError:true})});
    } else {
    return next()
}
}
        
    


   

