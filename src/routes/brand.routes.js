import Router from "express-promise-router";
import * as controllerBrand from "../controllers/brand.controllers.js";
import { isAuth } from "../middleware/validate.middleware.js";
export const routeBrand = Router();

routeBrand.get("/", controllerBrand.findAll);
routeBrand.post("/", isAuth, controllerBrand.create);
