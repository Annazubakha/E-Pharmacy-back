import * as categoriesService from "../services/categoriesService.js";

export const getAllCategories = async (req, res, next) => {
  try {
    const result = await categoriesService.listCategories();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
