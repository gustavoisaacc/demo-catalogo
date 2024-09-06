import Router from "express-promise-router";
import * as productController from "../controllers/product.controllers.js";
import { upload } from "../config/multer.js";
import { isAuth } from "../middleware/validate.middleware.js";

export const productRouter = Router();

// Routes
productRouter.post(
  "/",
  [isAuth, upload.fields([{ name: "image", maxCount: 1 }])],
  productController.create
);
productRouter.put(
  "/:id",
  [isAuth, upload.fields([{ name: "image", maxCount: 1 }])],
  productController.updateOne
);
productRouter.get("/", productController.findAll);
productRouter.get("/brand", productController.findByBrand);
productRouter.delete("/:id", isAuth, productController.deleteOne);
productRouter.get(
  "/:id/availability",
  isAuth,
  productController.updateAvailability
);
