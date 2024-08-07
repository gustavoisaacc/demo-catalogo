import { Category } from "../model/category.model.js";
import { Product } from "../model/product.modal.js";
import { deleteFile, uploadFile } from "../utils/uploadFile.js";

export const create = async (req, res) => {
  const data = req.body;
  const image = req.files.image;

  if (image && image.length > 0) {
    const imageUrl = await uploadFile(image[0]);
    data.image = imageUrl.downloadUrl;
  }
  const product = new Product(data);
  await product.save();
  res.status(200).json({ menssage: "Product created successfully" });
};

export const findAll = async (req, res) => {
  const { page = 1, limit = 2 } = req.query;
  if (limit) {
    const product = await Product.find()
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .exec();
    const count = await Product.countDocuments();
    return res.json({
      product,
      totalPage: Math.ceil(count / limit),
      currentPage: page,
    });
  }
  const products = await Product.find().populate("category");
  res.json(products);
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
