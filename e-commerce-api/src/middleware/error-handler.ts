import { NextFunction, Request, Response } from "express";
import { CustomError, ErrorResponse } from "./interface";

export const errorHandler = (err: CustomError | Error, req: Request, res: Response, next: NextFunction) => {
  const errorCode = (err as CustomError).statusCode || 500;
  const message = (err as CustomError).message || 'Internal Server Error';

  // Log full error details for debugging in 500 errors
  if (errorCode === 500) {
    console.error('Internal Server Error:', {
      message: (err as Error).message,
      stack: (err as Error).stack,
      additionalDetails: err, // Log any additional error properties
    });
  }

  const responseJson: ErrorResponse = { errorCode, message };
  res.status(errorCode).json(responseJson);
};

export const throwRequestError = (message: string, statusCode = 400): void => {
  throw ({
    statusCode,
    message
  })
}