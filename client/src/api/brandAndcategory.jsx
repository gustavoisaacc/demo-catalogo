import { api } from "../utils/axios";

export const getBrandRequest = async () => api.get("/brand");

//category
export const getCategoryRequest = async () => api.get("/category");
