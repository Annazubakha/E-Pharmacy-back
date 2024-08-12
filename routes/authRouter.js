import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  registerController,
  loginController,
  logOutController,
} from "../controllers/authControllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import { loginSchema, registerSSchema } from "../models/user.js";

const authRouter = express.Router();

authRouter.post("/login", validateBody(loginSchema), loginController);
authRouter.post("/register", validateBody(registerSSchema), registerController);
authRouter.post("/logout", authenticate, logOutController);

export default authRouter;
