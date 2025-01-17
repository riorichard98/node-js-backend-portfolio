import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

import prisma from "../models/primsa-client";
import { User } from "@prisma/client";

import { LoginRequest, RegisterRequest } from "../joi/interface";
import { RegisterResponse, LoginResponse } from "./interface";
import { throwRequestError } from "../middleware/error-handler";
import { AUTH_ERROR_MESSAGE } from "../constants/auth-error-message";
import { env } from "../environment/environment";

const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const emailExist = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })
    if (emailExist) throwRequestError(AUTH_ERROR_MESSAGE.EMAIL_EXISTS)
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const createdUser = await prisma.user.create({
        data: {
            email: data.email,
            fullName: data.fullName,
            passwordHash: hashedPassword
        }
    })
    return {
        userId: createdUser.userId
    }
}

const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const { email, password } = data
    const userFound = await prisma.user.findUnique({
        where: { email }
    })
    if (!userFound) throwRequestError(AUTH_ERROR_MESSAGE.INVALID_EMAIL);
    const { userId } = userFound as User;
    const validPassword = await bcrypt.compare(password, (userFound as User).passwordHash as string);
    if (!validPassword) throwRequestError(AUTH_ERROR_MESSAGE.INVALID_PASSWORD);
    const token = jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: '1d' });
    return { token }
}

export const authUsecase = {
    register,
    login
};