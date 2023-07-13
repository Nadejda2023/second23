import { body } from "express-validator"
import { inputValidationErrors } from "./inputvalidationmiddleware"
//import { blogsRepository } from "../repositories/blogs-in-memory1-repository"





const titleValidation = body('title')
                                    .isString()
                                    .withMessage('Must be string')
                                    .trim()
                                    //.isEmpty()
                                    .isLength({min: 1, max: 30})
                                    .withMessage('Length must be from 1 to 30 simbols')
const shortDescriptionValidation = body('shortDescription')
                                        .isString()
                                        .withMessage('Must be string')
                                        .trim()
                                        //.isEmpty()
                                        .isLength({min: 1, max: 100})
                                        .withMessage('Length must be from 1 to 100 simbols')
const contentValidation = body('content')
                                        .isString()
                                        .withMessage('Must be string')
                                        .trim()
                                        //.isEmpty()
                                        .isLength({min: 1, max: 1000})
                                        .withMessage('Length must be from 1 to 1000 simbols')  
                                        
const blogIdValidation =  body('blogId')
                                        .isString()
                                        .withMessage('Must be string')
                                        .trim()
                                        //.isEmpty()
                                        .custom((value: string) => {
                                            /*if (!blogsRepository.findBlogById(value)) {
                                                throw new Error('Blog is not found');
                                            }
                                            return true;*/
                                            })

export const createPostValidation = 
    [titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation, inputValidationErrors]
export const updatePostValidation = 
    [titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation, inputValidationErrors]