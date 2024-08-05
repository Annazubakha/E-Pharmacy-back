import { Product } from "../models/product.js";

export const listProducts = async (query) => {
  try {
    const { name, category } = query;
    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);
    return products;
  } catch (error) {
    return error;
  }
};
export const getProductById = async (productId) => {
  return Product.findById(productId);
};
