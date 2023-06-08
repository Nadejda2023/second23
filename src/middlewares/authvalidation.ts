import { Request, Response, NextFunction} from "express";

export const bAuthMiddleware = (req: Request,res: Response,next: NextFunction) => {
 const encodedData = Buffer.from("admin:qwerty").toString('base64')
 const correct = 'Basic ${encodedData}'

 if(req.headers.authorization !== correct) res.send(401)
    next();
}
