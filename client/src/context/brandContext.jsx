import { createContext, useEffect, useState } from "react";
import { getBrandRequest } from "../api/brandAndcategory";

export const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
  const [brand, setBrand] = useState([]);
  if (!brand || Array.isArray(brand)) {
    setBrand([
      {
        id: 1,
        name: "Product 1",
      },
      // Add more products here...
    ]);
  }
  const getBrand = async () => {
    try {
      const res = await getBrandRequest();
      setBrand(res.data.brand);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrand();
  }, []);

  return (
    <BrandContext.Provider value={{ brand, getBrand }}>
      {children}
    </BrandContext.Provider>
  );
};
