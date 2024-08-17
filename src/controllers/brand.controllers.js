import { Brand } from "../model/brand.js";

export const findAll = async (req, res) => {
  const brand = await Brand.find().sort({ name: 1 });

  res.json({ brand });
};

export const create = async (req, res) => {
  const { name } = req.body;
  const newBrand = new Brand({ name });

  await newBrand.save();
  res.status(200).json({ message: "Success!" });
};
