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
  upload.fields([{ name: "image", maxCount: 1 }]),
  productController.updateOne
);
productRouter.get("/", productController.findAll);
productRouter.delete("/:id", productController.deleteOne);
productRouter.get("/:id/availability", productController.updateAvailability);
