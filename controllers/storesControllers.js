import * as storesService from "../services/storesService.js";

export const getAllStores = async (req, res, next) => {
  try {
    const result = await storesService.listStores();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getNearestStore = async (req, res, next) => {
  try {
    const result = await storesService.listNearestStores();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
