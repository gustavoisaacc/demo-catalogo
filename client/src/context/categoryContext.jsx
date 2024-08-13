import { createContext, useEffect, useState } from "react";
import { getCategoryRequest } from "../api/brandAndcategory";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState([]);

  const getCategory = async () => {
    try {
      const res = await getCategoryRequest();
      setCategory(res.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <CategoryContext.Provider value={{ category, getCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
