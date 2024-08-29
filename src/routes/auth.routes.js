import Router from "express-promise-router";
import * as authControllers from "../controllers/auth.controllers.js";
import { Validated } from "../middleware/validate.middleware.js";
import { authSchema } from "../schema/auth.schema.js";

export const Authrouter = Router();

Authrouter.post("/register", authControllers.register);
Authrouter.post("/login", authControllers.login);
Authrouter.post("/verify", authControllers.verifycateTokens);
Authrouter.post("/logout", authControllers.logout);
