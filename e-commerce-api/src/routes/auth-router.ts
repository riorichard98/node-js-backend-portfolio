import { Router } from "express";

import { authHandler } from "../handler/auth-handler";
import { handlerWrapper as h } from "../middleware/handler-wrapper";

const authRouter = Router();

authRouter.post('/register', h(authHandler.register)); // register
authRouter.post('/login', h(authHandler.login)); // login

export default authRouter;