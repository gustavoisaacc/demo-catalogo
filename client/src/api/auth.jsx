import { api } from "../utils/axios";

export const loginReq = async (user) => api.post("/login", user);
