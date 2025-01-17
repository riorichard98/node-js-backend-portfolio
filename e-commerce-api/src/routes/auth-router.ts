import { Router } from "express";

import { authHandler } from "../handler/auth-handler";
import { catchWrapper as c } from "../middleware/catch-wrapper";

const authRouter = Router();

authRouter.post('/register', c(authHandler.register)); // register
authRouter.post('/login', c(authHandler.login)); // login

export default authRouter;