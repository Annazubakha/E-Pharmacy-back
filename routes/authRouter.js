import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  registerController,
  loginController,
  logOutController,
  refreshController,
} from "../controllers/authControllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import { loginSchema, registerSSchema, refreshSchema } from "../models/user.js";

const authRouter = express.Router();

authRouter.post("/login", validateBody(loginSchema), loginController);
authRouter.post("/register", validateBody(registerSSchema), registerController);
authRouter.post("/logout", authenticate, logOutController);
authRouter.post("/refresh", validateBody(refreshSchema), refreshController);

export default authRouter;
