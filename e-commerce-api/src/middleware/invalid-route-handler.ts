import { Request, Response, NextFunction } from "express";

export const invalidRouter = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json('url not found')
};