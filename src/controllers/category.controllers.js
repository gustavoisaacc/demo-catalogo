import { Category } from "../model/category.model.js";

export const findAll = async (req, res) => {
  const category = await Category.find().sort({ name: 1 });
  res.json({ category });
};
