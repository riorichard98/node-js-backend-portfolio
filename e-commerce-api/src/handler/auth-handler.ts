import { Request, Response } from 'express';
import { loginSchema, registerSchema } from '../joi/schema/auth-joi';
import { throwRequestError } from '../middleware/error-handler';
import { authUsecase } from '../usecase/auth-usecase';

const register = (req: Request, res: Response) => {
    const validation = registerSchema.validate(req.body)
    if (validation.error) throwRequestError(validation.error.details[0].message)
    const data = authUsecase.register(validation.value)
    res.status(201).json({ data })
}

const login = (req: Request, res: Response) => {
    const validation = loginSchema.validate(req.body)
    if (validation.error) throwRequestError(validation.error.details[0].message)
    const data = authUsecase.login(validation.value)
    res.status(200).json({ data })
}

export const authHandler = {
    register,
    login
};