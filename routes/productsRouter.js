import express from "express";
import {
  getAllProducts,
  getOneProduct,
} from "../controllers/productsControllers.js";
import { isValidId } from "../helpers/isValidId.js";

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", isValidId, getOneProduct);

export default productsRouter;
