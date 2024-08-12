import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/login", loginController);
authRouter.post("/register", registerController);

export default authRouter;
