import * as reviewsService from "../services/reviewsService.js";

export const getAllReviews = async (req, res, next) => {
  try {
    const result = await reviewsService.listReviews();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
