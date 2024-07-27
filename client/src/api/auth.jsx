import { api } from "../utils/axios";

export const loginRequest = async (user) => api.post("/login", user);

export const verifyTokenRequest = async (token) =>
  api.post("/verify", { token });

export const logout = async () => api.post("/logout");
