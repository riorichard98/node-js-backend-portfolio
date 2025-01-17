import { Request, Response, NextFunction } from "express";

export interface CustomError {
    statusCode?: number;
    message?: string;
}

export interface ErrorResponse {
    errorCode: number;
    message: string;
}

export interface Handler {
    (req: Request, res: Response, next?: NextFunction): Promise<void> | void;
}