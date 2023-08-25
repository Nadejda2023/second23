import { body } from "express-validator"
import { inputValidationErrors } from "./inputvalidationmiddleware"

const loginOrEmail = body('loginOrEmail')
                                    .isString()
                                    .withMessage('Must be string')
                                    
const password = body('password')
                                        .isString()
                                        .withMessage('Must be string')
                                        .trim()
                                        .isEmpty()
                                        .isLength({min: 6, max: 20})
const contentValidation = body('content')          
                                        .isString()
                                        .withMessage('Must be string')
                                        .trim()
                                        .isEmpty()
                                        .isLength({min: 20, max: 300})
                                        .withMessage('Length must be from 20 to 300 simbols')

                                        
                                                                               
                                       
 export const loginPasswordValidation = [loginOrEmail, password , inputValidationErrors] 
 export const AuthInputUpdateValidation = [contentValidation , inputValidationErrors]                                        