import Router from "express-promise-router";
import * as controllerCategory from "../controllers/category.controllers.js";
export const routeCategory = Router();

routeCategory.get("/", controllerCategory.findAll);
