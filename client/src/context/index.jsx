import { useContext } from "react";
import { AuthContext } from "./authContext";
import { ProductContext } from "./productContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext is not defined");
  return context;
};
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("AuthContext is not defined");
  return context;
};
