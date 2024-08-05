import { Category } from "../models/category.js";

export const listCategories = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {
    return error;
  }
};
