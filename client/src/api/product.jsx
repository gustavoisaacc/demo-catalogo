import { api } from "../utils/axios";

export const getProductRequest = async ({ currentPage }) =>
  api.get(`/product?page=${currentPage}&limit=2`);
export const getBrandRequest = async ({ brand }) =>
  api.get(`/product?brand=${brand}`);

export const postProductReques = async (data) => api.post("/product", data);

export const updateProductReques = async (id, data) =>
  api.put(`/product/${id}`, data);
export const deleteProductReques = async (id) => api.delete(`/product/${id}`);

export const isAvailable = async (id) => api.get(`/product/${id}/availability`);
