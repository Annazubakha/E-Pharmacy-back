import { Schema, model } from "mongoose";

const storeSchema = new Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    cite: {
      type: String,
    },
    phone: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  { versionKey: false }
);

export const Store = model("store", storeSchema, "stores");

export const StoreNear = model("store", storeSchema, "stores-near");
