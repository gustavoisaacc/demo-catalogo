import { Brand } from "../model/brand.js";

export const findAll = async (req, res) => {
  const brand = await Brand.find().sort({ name: 1 });

  res.json({ brand });
};
