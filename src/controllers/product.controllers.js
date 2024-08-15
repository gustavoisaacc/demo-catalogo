import { Category } from "../model/category.model.js";
import { Brand } from "../model/brand.js";
import { Product } from "../model/product.modal.js";
import { deleteFile, uploadFile } from "../utils/uploadFile.js";

import { validateProduct } from "../schema/product.schema.js";

export const create = async (req, res) => {
  const data = req.body;

  const image = req.files.image;
  const result = validateProduct({
    name: data.name,
    price: data.price,
    category: data.category,
    description: data.description,
    brand: data.brand,
  });

  if (!result.success) res.status(400).json(result);

  const newProduct = new Product(data);
  if (image && image.length > 0) {
    const { ref, downloadUrl } = await uploadFile(image[0]);
    newProduct.image = downloadUrl;
  }

  if (data.category) {
    const findCategory = await Category.findOne({
      name: { $in: data.category },
    });
    if (!findCategory) {
      const error = new Error("Category not found");
      return res.status(404).json({ menssage: error.message });
    }
    newProduct.category = findCategory._id;
  }

  if (data.brand) {
    const findBrand = await Brand.findOne({
      name: { $in: data.brand },
    });
    if (!findBrand) {
      const error = new Error("Brand not found");
      return res.status(404).json({ message: error.message });
    }
    newProduct.brand = findBrand._id;
  }

  await newProduct.save();
  res.status(200).json({ message: "Success!" });
};

export const findAll = async (req, res) => {
  const { page = 1, limit } = req.query;

  if (limit) {
    // Manejo de paginación
    try {
      const products = await Product.find()
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit))
        .exec();
      const count = await Product.countDocuments();
      return res.json({
        products,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error fetching paginated products" });
    }
  }

  // Si no hay límite en la consulta, devuelve todos los productos
  try {
    const products = await Product.find().populate("category");
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching products" });
  }
};

export const deleteOne = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const findProduct = await Product.findById(id);
  if (!findProduct) throw new Error("Product not found");
  const imagePath = findProduct.image;
  if (imagePath) await deleteFile(imagePath);
  await findProduct.deleteOne();
  res.json({ menssage: "Product deleted successfully" });
};

export const updateOne = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const image = req.files.image;

  const findProduct = await Product.findById(id);
  console.log("🚀 ~ updateOne ~ findProduct:", findProduct);
  if (!findProduct) throw new Error("Product not found");
  if (image === "undefined") {
    data.image = data.image;
  }
  if (image && image.length > 0) {
    const imageUrl = await uploadFile(image[0]);
    if (findProduct.image !== imageUrl) {
      await deleteFile(findProduct.image);
      data.image = imageUrl.downloadUrl;
    }
  }

  findProduct.name = data.name || findProduct.name;
  findProduct.price = data.price || findProduct.price;
  findProduct.description = data.description || findProduct.description;
  findProduct.image = data.image;
  await findProduct.save();
  res.status(200).json({ menssage: "Product update successfully " });
};

export const updateAvailability = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById({ _id: id });

  if (!product) return res.json({ msg: "not fund" });

  product.availability = !product.availability;
  await product.save();
  res.json({ data: product });
};
