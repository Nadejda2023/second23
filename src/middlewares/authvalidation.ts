import { Request, Response, NextFunction} from "express";
import { header,body } from "express-validator";
import { usersRepository } from "../repositories/users-repository";

export const bAuthMiddleware = header('authorization').
 custom(value => {
  if (!usersRepository.find(u => u.loginPass === value)) {
  throw new Error('401');
 }
 return true
 })


   

