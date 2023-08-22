import { body } from "express-validator"
import { inputValidationErrors } from "./inputvalidationmiddleware"

const loginOrEmail = body('loginOrEmail')
                                    .isString()
                                    .withMessage('Must be string')
                                    
const password = body('password')
                                        .isString()
                                        .withMessage('Must be string')
                                       
 export const loginPasswordValidation = 
                                        [loginOrEmail, password , inputValidationErrors]                                       