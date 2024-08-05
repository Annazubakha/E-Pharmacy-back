import { Store, StoreNear } from "../models/store.js";

export const listStores = async () => {
  try {
    const stores = await Store.find();
    return stores;
  } catch (error) {
    return error;
  }
};

export const listNearestStores = async () => {
  try {
    const stores = await StoreNear.find();
    return stores;
  } catch (error) {
    return error;
  }
};
