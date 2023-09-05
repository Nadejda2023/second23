import { body } from "express-validator";
import { inputValidationErrors } from "./inputvalidationmiddleware";
import { usersTwoRepository } from "../repositories/usersRepository";


const loginValidation = body('login')
                                            .isString()
                                            .withMessage('Must be string')
                                            .trim()
                                            .notEmpty()
                                            .isLength({min: 3, max: 10})
                                            .withMessage('Length must be from 3 to 10 simbols').custom(async (login) => {

                                                const user = await usersTwoRepository.findByLoginU(login);

                                                if(user){
                                                    throw new Error("User with this login uzhe founded ")
                                                    }
                                                    return true
                                                
                                                
                                            })

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
                                            .custom(async (email) => {
                                                const user = await usersTwoRepository.findUserByEmail(email);
                                                if(user){
                                                    throw new Error("User with this mail uzhe founded")
                                                }
                                                return true
                                             }) 


 const codeValidation = body('code')
                                            .isString()
                                            .withMessage('Must be string')
                                            .isEmail()
                                            .withMessage('Must be  Email')                                            
                                            

export const registrationComfiValidation = [emailValidation,loginValidation, inputValidationErrors]

export const UsersInputValidation = [loginValidation, passwordValidation ,emailValidation, inputValidationErrors]