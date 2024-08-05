import express from "express";
import {
  getAllStores,
  getNearestStore,
} from "../controllers/storesControllers.js";

const storesRouter = express.Router();

storesRouter.get("/", getAllStores);
storesRouter.get("/nearest", getNearestStore);

export default storesRouter;
