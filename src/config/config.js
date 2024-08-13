import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGODB = process.env.MONGODB_URI || "mongodb://localhost/db";
export const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost/5173";

const whiteList = [FRONTEND_URL, "http://localhost/5173"];

export const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
  credentials: true,
};
