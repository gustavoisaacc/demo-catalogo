import { createContext, useEffect, useState } from "react";
import {
  deleteProductReques,
  getProductRequest,
  postProductReques,
  updateProductReques,
} from "../api/product";
import { api } from "../utils/axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(() => {
    return;
  });
  const [totalPages, setTotalPages] = useState(1);

  const getProduct = async (page = 1, limit = 10) => {
    try {
      const res = await api.get(`/product`, {
        params: {
          page,
          limit,
        },
      });
      setProducts(res.data.product);
      setTotalPages(res.data.totalPage);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const createProduct = async (data) => {
    console.log("🚀 ~ createProduct ~ data:", data);

    try {
      const res = await postProductReques(data);
      setProducts(res.data);
      setLoading(false);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const updateProduct = async (id, data) => {
    try {
      const res = await updateProductReques(id, data);
      console.log("🚀 ~ updateProduct ~ res:", res);
      setProducts((prevProduct) =>
        prevProduct.map((product) => (product._id === id ? res.data : product))
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductReques(id);
      if (res.status === 200)
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct(currentPage);
  }, [currentPage]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        currentPage,
        totalPages,
        setCurrentPage,
        createProduct,
        updateProduct,
        getProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};