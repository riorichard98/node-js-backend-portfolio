import { NextFunction, Request, Response, Router } from "express";

import shipmentRouter from "./shipment-router";
import productRouter from "./product-router";
import authRouter from "./auth-router";
import transactionRouter from "./transaction-router";
import userRouter from "./user-router";
import { invalidRouter } from "../middleware/invalid-route-handler";

import { errorHandler } from "../middleware/error-handler";

const baseRouter = Router();

baseRouter.use('/shipments', shipmentRouter);
baseRouter.use('/products', productRouter);
baseRouter.use('/auth', authRouter);
baseRouter.use('/transactions', transactionRouter);
baseRouter.use('/users', userRouter);

baseRouter.all('*', invalidRouter);

export default baseRouter;