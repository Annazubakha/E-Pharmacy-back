import { Schema, Types, model } from "mongoose";
import { handleMongooseError } from "../helpers/handleMongooseError.js";
import Joi from "joi";

export const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
export const phonePattern = /^\+?\d{12}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [emailPattern, "Invalid email format"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      match: [phonePattern, "Invalid phone number format"],
    },
    cart: [
      {
        productId: { type: Types.ObjectId, ref: "product" },
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
        quantity: { type: Number, default: 0 },
      },
    ],
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

export const registerSSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const refreshSchema = Joi.object({
  token: Joi.string().required().messages({
    "any.required": "token is required",
    "string.base": "token should be a text string",
  }),
});

userSchema.post("save", handleMongooseError);

export const User = model("user", userSchema);
