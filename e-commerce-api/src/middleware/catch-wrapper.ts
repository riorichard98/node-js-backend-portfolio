import { Request, Response, NextFunction } from "express";
import { Handler } from "./interface"

export const catchWrapper = (handler: Handler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            handler(req, res, next);
        } catch (error) {
            next(error);  // Pass the error to the next middleware (error handler)
        }
    };
};