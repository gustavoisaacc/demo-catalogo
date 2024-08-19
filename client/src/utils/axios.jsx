import axios from "axios";
const urlBackend = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL:", urlBackend);
export const api = axios.create({
  baseURL: `https://demo-catalogo.onrender.com/api/v1`,
  withCredentials: true,
});
