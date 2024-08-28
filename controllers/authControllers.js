import * as authService from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.js";

dotenv.config();

const { SECRET_KEY } = process.env;

export const registerController = async (req, res, next) => {
  try {
    const { email, password, name, phone } = req.body;
    const user = await authService.findEmail({ email });

    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await authService.register({
      ...req.body,
      password: hashPassword,
      name,
      phone,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.findEmail({ email });

    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    user.token = token;
    await user.save();
    res.json({
      token,
      user: {
        email: user.email,
        name: user.name,
        phone: user.phone,
        cart: user.cart,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logOutController = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

export const refreshController = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      throw HttpError(400, "Token is required");
    }
    let decoded;
    try {
      decoded = jwt.verify(token, SECRET_KEY);
    } catch (err) {
      throw HttpError(401, "Invalid token");
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      throw HttpError(404, "User was not found");
    }
    res.json({
      user: {
        email: user.email,
        name: user.name,
        phone: user.phone,
      },
    });
  } catch (error) {
    next(error);
  }
};
