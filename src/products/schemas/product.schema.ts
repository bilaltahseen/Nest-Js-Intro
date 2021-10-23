import { Schema } from "mongoose";

export const ProductSchema = new Schema({
    title: String,
    price: Number,
  });