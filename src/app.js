import express from "express";

import { Authrouter } from "./routes/auth.routes.js";

export const app = express();

app.use(express.json());

// routes
app.use("/api/v1/", Authrouter);
