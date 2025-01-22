import { Request } from "express";
import dayjs from "dayjs";

import { validateRequest } from "../utils/common"
import { updateUserSchema } from "../joi/schema/user-joi"
import { userUsecase } from "../usecase/user-usecase"

const userDetail = (req: Request) => {
    const { fullName, email, createdAt, updatedAt } = req.user;
    const data = {
        fullName,
        email,
        joinedAt: dayjs(createdAt).toString(),
        updatedAt: dayjs(updatedAt).toString()
    };
    return { data, statusCode: 200 }
}

const updateUser = async (req: Request) => {
    const body = validateRequest(updateUserSchema, req.body)
    await userUsecase.updateUser(body, req.user.userId )
    return { data: {}, statusCode: 200 }
}

export const userHandler = {
    userDetail,
    updateUser
}