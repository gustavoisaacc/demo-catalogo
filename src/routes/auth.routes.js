import Router from "express-promise-router";
import * as authControllers from "../controllers/auth.controllers.js";

export const Authrouter = Router();

Authrouter.post("/register", authControllers.register);
Authrouter.post("/login", authControllers.login);
