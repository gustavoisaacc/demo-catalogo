import { createContext, useEffect, useState } from "react";
import { getCategoryRequest } from "../api/brandAndcategory";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState([]);

  if (!category || Array.isArray(category)) {
    setCategory([
      {
        id: 1,
        name: "Product 1",
      },
      // Add more products here...
    ]);
  }
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
