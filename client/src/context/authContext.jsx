import { createContext, useEffect, useState } from "react";
import { loginReq } from "../api/auth";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signin = async (user) => {
    try {
      const res = await loginReq(user);
      setUser(res.data);
      console.log(res);
      setIsAuth(true);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
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
