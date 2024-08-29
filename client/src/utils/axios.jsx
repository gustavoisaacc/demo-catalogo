import axios from "axios";
const urlBackend = import.meta.env.VITE_BACKEND_URL;
export const api = axios.create({
  baseURL: `${urlBackend}/api/v1`,
  withCredentials: true,
});
