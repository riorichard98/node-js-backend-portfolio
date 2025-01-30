import { Request } from "express"
import { validateRequest } from "../utils/common"
import { buyProductSchema, createNewPaymentSchema } from "../joi/schema/transaction-joi"
import { transactionUsecase } from "../usecase/transaction-usecase"
import prisma from "../models/primsa-client"
import { throwRequestError } from "../middleware/error-handler"
import { GENERAL_ERROR_MESSAGE } from "../constants/general-error-message"

const buyProduct = async (req: Request) => {
    const body = validateRequest(buyProductSchema, req.body)
    const data = await transactionUsecase.buyProduct(body, req.user.userId)
    return { data, statusCode: 201 };
}

const transactionDetail = async (req: Request) => {
    const transactionId = req.params.transactionId
    const userId = req.user.userId
    const transactionFound = await prisma.transaction.findUnique({
        where: { transactionId, userId }
    })
    if (!transactionFound) throwRequestError(GENERAL_ERROR_MESSAGE.DATA_NOT_EXISTS);
    return { data: transactionFound, statusCode: 200 };
}

const createNewPayment = async (req: Request) => {
    const body = validateRequest(createNewPaymentSchema, req.body);
    const data = await transactionUsecase.makePayment(body, req.user.userId)
    return { data, statusCode: 201 }
}

const paymentDetail = async (req: Request) => {
    const paymentId = req.params.paymentId
    const userId = req.user.userId
    const paymentFound = await prisma.payment.findUnique({
        where: {
            paymentId,
            transaction: {
                userId
            }
        }
    })
    if (!paymentFound) throwRequestError(GENERAL_ERROR_MESSAGE.DATA_NOT_EXISTS);
    return { data: paymentFound, statusCode: 200 };
}

const requestToProcessPayment = async (req: Request) => {
    const paymentId = req.params.paymentId
    await transactionUsecase.processPayment(paymentId)
    return { data: {}, statusCode: 200 }
}

export const transactionHandler = {
    buyProduct,
    transactionDetail,
    createNewPayment,
    paymentDetail,
    requestToProcessPayment
}