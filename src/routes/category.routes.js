import Router from "express-promise-router";
import * as controllerCategory from "../controllers/category.controllers.js";
import { isAuth } from "../middleware/validate.middleware.js";

export const routeCategory = Router();

routeCategory.get("/", controllerCategory.findAll);
routeCategory.post("/", controllerCategory.create);
