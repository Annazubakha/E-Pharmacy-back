import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    id: {
      type: String,
    },
    photo: {
      type: String,
    },
    name: {
      type: String,
    },
    suppliers: {
      type: String,
    },
    stock: {
      type: String,
    },
    price: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  { versionKey: false }
);

export const Product = model("product", productSchema, "products");
