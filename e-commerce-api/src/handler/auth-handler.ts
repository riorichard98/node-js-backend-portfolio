import { Request } from 'express';
import { loginSchema, registerSchema } from '../joi/schema/auth-joi';
import { authUsecase } from '../usecase/auth-usecase';
import { validateRequest } from '../utils/common';

const register = async (req: Request) => {
    const body = validateRequest(registerSchema, req.body)
    const data = await authUsecase.register(body)
    return { data, statusCode: 201 }
}

const login = async (req: Request) => {
    const body = validateRequest(loginSchema,req.body)
    const data = await authUsecase.login(body)
    return { data, statusCode: 200 }
}

export const authHandler = {
    register,
    login
};