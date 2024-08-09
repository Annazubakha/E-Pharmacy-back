import { Product } from "../models/product.js";

export const listProducts = async (query) => {
  try {
    const { name, category, page = 1, limit = 12 } = query;
    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }
    const skip = (page - 1) * limit;

    const products = await Product.find(filter).skip(skip).limit(limit);
    return products;
  } catch (error) {
    return error;
  }
};
export const getProductById = async (productId) => {
  return Product.findById(productId);
};
