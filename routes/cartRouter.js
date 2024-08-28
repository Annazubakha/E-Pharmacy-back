import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  getAllCart,
  updateCart,
  checkOut,
} from "../controllers/cartController.js";

const cartRouter = express.Router();

cartRouter.get("/", authenticate, getAllCart);
cartRouter.put("/update", authenticate, updateCart);
cartRouter.post("/checkout", authenticate, checkOut);

export default cartRouter;
