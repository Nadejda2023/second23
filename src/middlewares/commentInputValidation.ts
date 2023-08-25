import { body } from "express-validator";
import { inputValidationErrors } from "./inputvalidationmiddleware";

const contentValidation = body('content')
                                        .isString()
                                        .withMessage('Must be string')
                                        .trim()
                                        //.isEmpty()
                                        .isLength({min: 20, max: 300})
                                        .withMessage('Length must be from 20 to 300 simbols')  

                                        export const createPostValidationC = 
                                        [ contentValidation, inputValidationErrors]                               