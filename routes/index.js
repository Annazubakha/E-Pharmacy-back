import { Router } from "express";

import reviewsRouter from "./reviewsRouter.js";
import storesRouter from "./storesRouter.js";
import productsRouter from "./productsRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import authRouter from "./authRouter.js";
import cartRouter from "./cartRouter.js";

const mainRouter = Router();

mainRouter.use("/customer-reviews", reviewsRouter);
mainRouter.use("/stores", storesRouter);
mainRouter.use("/products", productsRouter);
mainRouter.use("/categories", categoriesRouter);
mainRouter.use("/user", authRouter);
mainRouter.use("/cart", cartRouter);

export default mainRouter;
