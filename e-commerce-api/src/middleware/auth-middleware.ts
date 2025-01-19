import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';

import { GENERAL_ERROR_MESSAGE } from "../constants/general-error-message"
import { env } from "../environment/environment";
import prisma from "../models/primsa-client";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken || !bearerToken.startsWith('Bearer ')) throw new Error('invalid token');
        const token = bearerToken.split(' ')[1];
        const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload & { userId: string };
        const userFound = await prisma.user.findUnique({
            where: {
                userId: payload.userId
            }
        })
        if (!userFound) throw new Error('invalid user');
        req.userId = payload.userId;
        next()
    } catch (error) {
        return res.status(401).json(GENERAL_ERROR_MESSAGE.UNAUTHORIZED)
    }
}