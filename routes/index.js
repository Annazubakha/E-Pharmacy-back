import { Router } from "express";

import reviewsRouter from "./reviewsRouter.js";
import storesRouter from "./storesRouter.js";
import productsRouter from "./productsRouter.js";
import categoriesRouter from "./categoriesRouter.js";

const mainRouter = Router();

mainRouter.use("/customer-reviews", reviewsRouter);
mainRouter.use("/stores", storesRouter);
mainRouter.use("/products", productsRouter);
mainRouter.use("/categories", categoriesRouter);

export default mainRouter;
