import { Request, Router ,Response } from "express";
export const testingRouter = Router ({})


testingRouter.delete('/all-data', (req, res) => {
//to dosit
    res.status(204).json([]);
  });