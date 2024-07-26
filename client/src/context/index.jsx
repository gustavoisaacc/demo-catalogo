import { useContext } from "react";
import { AuthContext } from "./authContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext is not defined");
  return context;
};
