import { Product } from "../models/product.js";

export const listProducts = async (query) => {
  try {
    const { name, category, page = 1, limit = 12 } = query;
    const filter = {};

    if (name) {
      filter.name = { $regex: name.trim(), $options: "i" };
    }

    if (category) {
      filter.category = category.trim();
    }

    const totalItems = await Product.countDocuments(filter);

    const totalPages = Math.ceil(totalItems / limit);

    const skip = (page - 1) * limit;

    const products = await Product.find(filter).skip(skip).limit(limit);
    return {
      products,
      totalPages,
      page,
    };
  } catch (error) {
    return error;
  }
};
export const getProductById = async (productId) => {
  return Product.findById(productId);
};
