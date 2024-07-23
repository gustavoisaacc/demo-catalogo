import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/config.js";

export const createAccessToken = (payload) => {
  new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};
