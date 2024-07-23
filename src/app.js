import express from "express";

import { Authrouter } from "./routes/auth.routes.js";

export const app = express();

app.use(express.json());

// routes
app.use("/api/v1/", Authrouter);

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});
