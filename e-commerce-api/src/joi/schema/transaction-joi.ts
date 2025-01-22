import { $Enums } from "@prisma/client";
import Joi from "joi";

export const buyProductSchema = Joi.object({
    productId: Joi.string().uuid().required(),
    quantity: Joi.number().min(1).required()
}).meta({ className: 'BuyProductData' });

export const createNewPaymentSchema = Joi.object({
    transactionId: Joi.string().uuid().required(),
    paymentMethod: Joi.string().valid(...Object.values($Enums.PaymentMethod)).required()
}).meta({ className: 'CreateNewPaymentData'})