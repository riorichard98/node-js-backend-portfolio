import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

import { UpdateUserRequest } from "../joi/interface"
import { throwRequestError } from "../middleware/error-handler";
import prisma from "../models/primsa-client";
import { AUTH_ERROR_MESSAGE } from "../constants/auth-error-message";

const updateUser = async (data: UpdateUserRequest, userId: string): Promise<void> => {
    const { email, fullName, password } = data;
    const updateUserData: Prisma.UserUpdateInput = {}
    if (email) {
        const userWithSameEmail = await prisma.user.findUnique({
            where: {
                email,
                NOT: { userId }
            }
        });
        if (userWithSameEmail) throwRequestError(AUTH_ERROR_MESSAGE.EMAIL_EXISTS);
        updateUserData.email = email;
    }
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10)
        updateUserData.passwordHash = hashedPassword;
    }
    if (fullName) updateUserData.fullName = fullName;
    if (Object.values(updateUserData).length > 0) {
        await prisma.user.update({
            where: { userId },
            data: {
                updatedAt: new Date(),
                ...updateUserData
            }
        })
    }
}

export const userUsecase = {
    updateUser
}