import { Schema } from "mongoose";
import { model, models } from "mongoose";
const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
});

export const product_model =
  models.product_model || model("product_model", ProductSchema);
