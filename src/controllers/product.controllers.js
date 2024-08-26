import { Category } from "../model/category.model.js";
import { Brand } from "../model/brand.js";
import { Product } from "../model/product.modal.js";
import { deleteFile, uploadFile } from "../utils/uploadFile.js";

import {
  validateProduct,
  validateProductUpdate,
} from "../schema/product.schema.js";

export const create = async (req, res) => {
  const data = req.body;

  const image = req.files.image;
  // const result = validateProduct({
  //   name: data.name,
  //   price: data.price,
  //   category: data.category,
  //   description: data.description,
  //   brand: data.brand,
  // });

  // console.log("🚀 ~ create ~ result:", result);
  // if (!result.success) {
  //   return res.status(400).json(result);
  // }

  const newProduct = new Product(data);
  if (image && image.length > 0) {
    const { ref, downloadUrl } = await uploadFile(image[0]);
    newProduct.image = downloadUrl;
  }

  if (data.category) {
    const findCategory = await Category.findById(data.category);
    if (!findCategory) {
      const error = new Error("Category not found");
      return res.status(404).json({ menssage: error.message });
    }
    newProduct.category = findCategory._id;
  }

  if (data.brand) {
    const findBrand = await Brand.findById(data.brand);
    if (!findBrand) {
      const error = new Error("Brand not found");
      return res.status(404).json({ message: error.message });
    }
    newProduct.brand = findBrand._id;
  }

  await newProduct.save();
  return res.status(200).json({ message: "Product created successfully!" });
};

export const findAll = async (req, res) => {
  const { page = 1, limit = 10, category, search } = req.query;

  // Convertir los parámetros de consulta a números
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  // Validar parámetros
  if (isNaN(pageNumber) || pageNumber < 1) {
    return res.status(400).json({ message: "Invalid page number" });
  }
  if (isNaN(limitNumber) || limitNumber < 1) {
    return res.status(400).json({ message: "Invalid limit number" });
  }

  try {
    let query = {};

    // Filtrar por categoría si se proporciona
    if (category) {
      const findCategory = await Category.findOne({ name: category });
      if (!findCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      query.category = findCategory._id;
    }
    if (search) {
      query.name = { $regex: search, $options: "i" }; // La opción 'i' hace la búsqueda insensible a mayúsculas/minúsculas
    }
    // Manejo de paginación y filtrado por categoría
    const products = await Product.find(query)
      .sort({ name: 1 })
      .limit(limitNumber)
      .skip((pageNumber - 1) * limitNumber)
      .populate("category")
      .populate("brand")
      .lean();

    const count = await Product.countDocuments(query);

    const totalPage = Math.ceil(count / limitNumber);
    res.json({
      products,
      totalPage,
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
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
  const image = req.files?.image;

  const result = validateProductUpdate(data);
  if (!result.success) {
    return res
      .status(400)
      .json({ message: "Invalid product data", errors: result.error });
  }

  const findProduct = await Product.findById(id);
  if (!findProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (image && image.length > 0) {
    const imageUrl = await uploadFile(image[0]);
    if (findProduct.image !== imageUrl.downloadUrl) {
      await deleteFile(findProduct.image);
      findProduct.image = imageUrl.downloadUrl;
    }
  }

  if (data.category && data.category !== findProduct.category.toString()) {
    findProduct.category = data.category;
  }

  if (data.brand && data.brand !== findProduct.brand.toString()) {
    findProduct.brand = data.brand;
  }

  // Actualizar solo los campos que están en el body
  findProduct.name = data.name ?? findProduct.name;
  findProduct.price = data.price ?? findProduct.price;
  findProduct.description = data.description ?? findProduct.description;

  await findProduct.save();
  return res.status(200).json({ message: "Product updated successfully" });
};

export const updateAvailability = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById({ _id: id });

  if (!product) return res.json({ msg: "not fund" });

  product.availability = !product.availability;
  await product.save();
  res.json({ data: product });
};
