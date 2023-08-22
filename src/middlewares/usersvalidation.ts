import { body } from "express-validator";
import { inputValidationErrors } from "./inputvalidationmiddleware";


const loginValidation = body('login')
                                            .isString()
                                            .withMessage('Must be string')
                                            .trim()
                                            .notEmpty()
                                            .isLength({min: 3, max: 10})
                                            .withMessage('Length must be from 3 to 10 simbols')

const passwordValidation = body('password')
                                            .isString()
                                            .withMessage('Must be string')
                                            .trim()
                                            .notEmpty()
                                            .isLength({min: 6, max: 20})
                                            .withMessage('Length must be from 6 to 20 simbols')

const emailValidation = body('email')
                                            .isString()
                                            .withMessage('Must be string')
                                            .isEmail()
                                            .withMessage('Must be  Email')
                                            



export const UsersInputValidation = [loginValidation, passwordValidation ,emailValidation, inputValidationErrors]