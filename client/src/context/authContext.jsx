import { createContext, useState } from "react";
import { loginReq } from "../api/auth";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const signin = async (user) => {
    try {
      const res = await loginReq(user);
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        errors,
        loading,
        user,
        signin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
