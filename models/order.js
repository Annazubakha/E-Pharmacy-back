import { Schema, Types, model } from "mongoose";
import { emailPattern, phonePattern } from "./user.js";

const orderSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "user", required: true },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [emailPattern, "Invalid email format"],
    },
    phone: {
      type: String,
      required: true,
      match: [phonePattern, "Invalid phone number format"],
    },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    products: [
      {
        productId: { type: Types.ObjectId, ref: "product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);
export const Order = model("order", orderSchema);
