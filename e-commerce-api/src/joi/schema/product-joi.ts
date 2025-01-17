import Joi from "joi";

export const insertProductSchema = Joi.object({
    productName: Joi.string().required(),
    productDescription: Joi.string().optional().allow(null, ''),
    stockQuantity: Joi.number().min(1).required(),
    price: Joi.number().required()
}).meta({ className: 'InsertProductData' });

export const updateProductSchema = Joi.object({
    productName: Joi.string().optional(),
    productDescription: Joi.string().optional().allow(null, ''),
    stockQuantity: Joi.number().min(1).optional(),
    price: Joi.number().optional()
}).meta({ className: 'UpdateProductData' });

export const productListSchema = Joi.object({
    productName: Joi.string().optional(), // for search product by product name
    limit: Joi.number().optional().default(10),
    offset: Joi.number().optional().default(0)
}).meta({ className: 'productListFilter'})