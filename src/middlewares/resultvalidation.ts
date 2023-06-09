import { Response, Request, NextFunction  } from "express";
import { ValidationChain, validationResult } from "express-validator";
import { formatWithOptions } from "util";
import { ValidationError, param} from "express-validator";


export const errorValidationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errorFormat = ({msg, param} : ValidationError) => {
        return {message:msg, field: msg}
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

    
};