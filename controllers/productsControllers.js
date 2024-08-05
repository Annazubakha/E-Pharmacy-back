import * as productsService from "../services/productsService.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const result = await productsService.listProducts(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
export const getOneProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await productsService.getProductById({ _id: id });
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
