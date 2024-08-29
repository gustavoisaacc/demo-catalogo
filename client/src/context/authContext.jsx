import Cookies from "js-cookie";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { loginRequest, logout, verifyTokenRequest } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState([]);

  const [loading, setLoading] = useState(true);

  // clear errors after 5 seconds
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
      const res = await loginRequest(user);

      Cookies.set("key", res.data.token, {
        expires: new Date(Date.now() + 60 * 60 * 1000),
      });
      setUser(res.data);
      setIsAuth(true);
      return res.data;
    } catch (error) {
      setErrors(error.response.data.message);
      setLoading(false);
    }
  };

  const signout = async () => {
    try {
      await logout();
      Cookies.remove("key");
      setUser(null);
      setIsAuth(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const verifySignin = async () => {
      const token = Cookies.get("key");
      if (!token) {
        setIsAuth(false);
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(token);
        if (!res.data) setLoading(false);
        setUser(res.data);
        setIsAuth(true);
        setLoading(false);
      } catch (error) {
        setIsAuth(false);
        setUser(null);
      }
    };
    verifySignin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuth,
        errors,
        loading,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
