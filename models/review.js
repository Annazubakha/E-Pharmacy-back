import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    name: {
      type: String,
    },
    testimonial: {
      type: String,
    },
  },
  { versionKey: false }
);

export const Review = model("review", reviewSchema, "customer-reviews");
