import Router from "express-promise-router";
import * as productController from "../controllers/product.controllers.js";
import { upload } from "../config/multer.js";

export const productRouter = Router();

// Routes
productRouter.post(
  "/",
  upload.fields([{ name: "image", maxCount: 1 }]),
  productController.create
);
productRouter.put(
  "/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  productController.updateOne
);
productRouter.get("/", productController.findAll);
productRouter.delete("/:id", productController.deleteOne);
