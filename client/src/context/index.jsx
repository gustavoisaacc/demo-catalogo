import { useContext } from "react";
import { AuthContext } from "./authContext";
import { ProductContext } from "./productContext";
import { CategoryContext } from "./categoryContext";
import { BrandContext } from "./brandContext";

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

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error("AuthContext is not defined");
  return context;
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) throw new Error("AuthContext is not defined");
  return context;
};
