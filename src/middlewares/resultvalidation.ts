import { Response, Request, NextFunction  } from "express";
import { validationResult } from "express-validator";
import { formatWithOptions } from "util";


export const errorValidationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = errors.array( { onlyFirstError: true}).map(elem => {
            return {
                message: elem.msg,
                field: elem.msg
            }
        })
       return  res.status(400).json( {"errorsMessage" : error});
    } else {
        return next();
    }

    
};