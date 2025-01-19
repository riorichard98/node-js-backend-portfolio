import { Router } from "express";

import { handlerWrapper as h} from "../middleware/handler-wrapper";
import { userHandler } from "../handler/user-handler";
import { authMiddleware } from "../middleware/auth-middleware";

const userRouter = Router();
userRouter.use(authMiddleware)
userRouter.get('',h(userHandler.userDetail)); // detail user by logged in userId
userRouter.put('',h(userHandler.updateUser)); // update user by logged in userId

export default userRouter;