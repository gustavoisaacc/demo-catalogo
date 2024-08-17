import { Category } from "../model/category.model.js";

export const findAll = async (req, res) => {
  const category = await Category.find().sort({ name: 1 });
  res.json({ category });
};

export const create = async (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({ name });
  await newCategory.save();
  res.status(200).json({ message: "Success!" });
};
