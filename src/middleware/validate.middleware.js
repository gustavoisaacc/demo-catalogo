import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";
import { ZodError } from "zod";

export const Validated = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json(
        error.issues.map((issu) => ({
          issue: issu.message,
          path: issu.path,
        }))
      );
    }

    return res.status(500).json({ error: "Internal server error" });
  }
  return;
};

export const isAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) return res.status(401).json({ message: "Invalid credential" });
    jwt.verify(token, SECRET_KEY, (err, decoder) => {
      if (err) {
        return res.status(401).json({ message: "Invalid credential" });
      }
      req.user = decoder.id;
      next();
    });
  } catch (error) {
    console.log("🚀 ~ isAuth ~ error:", error);
  }
};
