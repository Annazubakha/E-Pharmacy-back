import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  { versionKey: false }
);

export const Category = model(
  "category",
  categorySchema,
  "products-categories"
);
