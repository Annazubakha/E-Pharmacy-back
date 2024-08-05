import express from "express";
import { getAllReviews } from "../controllers/reviewsController.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/", getAllReviews);

export default reviewsRouter;
