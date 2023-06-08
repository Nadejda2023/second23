import { Request, Response, NextFunction} from "express";

export const bAuthMiddleware = (req: Request,res: Response,next: NextFunction) => {
    if(req.headers.authorization !== "Basic YWRtaW46cXdlcnR5") {
    res.sendStatus(401);
} else {
    next();
}
};