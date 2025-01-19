import Joi from "joi";

export const updateUserSchema = Joi.object({
    fullName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional()
}).meta({ className: 'UpdateUserRequest' });