import { Product, Transaction } from "@prisma/client";
import { GENERAL_ERROR_MESSAGE } from "../constants/general-error-message";
import { BuyProductData, CreateNewPaymentData } from "../joi/interface"
import { throwRequestError } from "../middleware/error-handler";
import prisma from "../models/primsa-client"
import { BuyProductResponse, CreateNewPaymentResponse } from "./interface"
import { TRANSACTION_ERROR_MESSAGE } from "../constants/transaction-error-message";

const buyProduct = async (data: BuyProductData, userId: string): Promise<BuyProductResponse> => {
    const { productId, quantity } = data;
    const productFound = await prisma.product.findUnique({
        where: { productId }
    })
    if (!productFound) throwRequestError(GENERAL_ERROR_MESSAGE.DATA_NOT_EXISTS);
    if (quantity > (productFound as Product).stockQuantity) throwRequestError(TRANSACTION_ERROR_MESSAGE.PRODUCT_OUT_OF_STOCK);
    const transactionCreated = await prisma.transaction.create({
        data: {
            status: 'PENDING',
            totalAmount: (productFound as Product).price * quantity,
            quantity,
            userId,
            productId
        }
    })
    return { transactionId: transactionCreated.transactionId };
}

const makePayment = async (data: CreateNewPaymentData, userId: string): Promise<CreateNewPaymentResponse> => {
    const { paymentMethod, transactionId } = data;
    const transactionFound = await prisma.transaction.findUnique({
        where: { transactionId, userId }
    })
    if (!transactionFound) throwRequestError(GENERAL_ERROR_MESSAGE.DATA_NOT_EXISTS)
    if ((transactionFound as Transaction).status === 'PAID') throwRequestError(TRANSACTION_ERROR_MESSAGE.TRANSACTION_ALREADY_PAID)
    const paymentCreated = await prisma.payment.create({
        data: {
            transactionId,
            amount: (transactionFound as Transaction).totalAmount,
            paymentMethod,
            status: 'PENDING'
        }
    })
    return { paymentId: paymentCreated.paymentId }
}

export const transactionUsecase = {
    buyProduct,
    makePayment
}