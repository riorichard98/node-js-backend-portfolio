import { Router } from "express";

import { authMiddleware } from "../middleware/auth-middleware";
import { handlerWrapper as h } from "../middleware/handler-wrapper";
import { transactionHandler } from "../handler/transaction-handler";

const transactionRouter = Router();

transactionRouter.use(authMiddleware)
transactionRouter.post('', h(transactionHandler.buyProduct)); // making new transaction
transactionRouter.get('/:transactionId', h(transactionHandler.transactionDetail)); // transaction detail
transactionRouter.post('/payments', h(transactionHandler.createNewPayment)); // making payment
transactionRouter.get('/payments/:paymentId', h(transactionHandler.paymentDetail)); // payment detail for the payment status

export default transactionRouter;