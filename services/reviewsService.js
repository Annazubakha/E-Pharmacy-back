import { Review } from "../models/review.js";

export const listReviews = async () => {
  try {
    const reviews = await Review.find();
    return reviews;
  } catch (error) {
    return error;
  }
};
