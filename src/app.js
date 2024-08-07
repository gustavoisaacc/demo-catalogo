import express from "express";
import cors from "cors";

import { Authrouter } from "./routes/auth.routes.js";
import { productRouter } from "./routes/product.routes.js";
import { createCategories } from "./utils/initialState.js";

export const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// routes
app.use("/api/v1/", Authrouter);
app.use("/api/v1/product", productRouter);

createCategories();
// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});
