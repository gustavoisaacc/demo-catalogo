import Router from "express-promise-router";
import * as controllerBrand from "../controllers/brand.controllers.js";
export const routeBrand = Router();

routeBrand.get("/", controllerBrand.findAll);
