import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { Authrouter } from "./routes/auth.routes.js";
import { productRouter } from "./routes/product.routes.js";
import { createBrand, createCategories } from "./utils/initialState.js";
import { routeBrand } from "./routes/brand.routes.js";
import { routeCategory } from "./routes/category.routes.js";
import { corsOptions } from "./config/config.js";

export const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// routes
app.use("/api/v1/", Authrouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/brand", routeBrand);
app.use("/api/v1/category", routeCategory);

createCategories();
createBrand();
// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});
