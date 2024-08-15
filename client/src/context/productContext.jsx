import { createContext, useEffect, useState } from "react";
import {
  deleteProductReques,
  isAvailable,
  postProductReques,
  updateProductReques,
} from "../api/product";
import { api } from "../utils/axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isStock, setIsStock] = useState(true);
  const [error, setError] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getProduct = async (page = 1, limit = 10) => {
    try {
      const res = await api.get(`/product`, {
        params: {
          page,
          limit,
        },
      });
      console.log("🚀 ~ getProduct ~ res:", res.data.products);
      setProducts(res.data.products);
      setTotalPages(res.data.totalPage);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const createProduct = async (data) => {
    setLoading(true);
    try {
      const res = await postProductReques(data);
      console.log("🚀 ~ createProduct ~ res:", res);
      if (res.status === 200) {
        setProducts(res.data);
        setLoading(false);
      }
      return res.data;
    } catch (error) {
      setError(error.response.data.menssage);
      setLoading(false);
      return error.response.data;
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
      setError(error.response.data.message);
    }
  };
  const updateAvailable = async (id) => {
    console.log("🚀 ~ updateAvailable ~ id:", id);
    try {
      const res = await isAvailable(id);
      console.log("🚀 ~ updateAvailable ~ res:", res.data.data.availability);
      setIsStock(res.data.data.availability);
      return res.data.data.availability;
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
        isStock,
        error,
        setCurrentPage,
        createProduct,
        updateProduct,
        getProduct,
        deleteProduct,
        updateAvailable,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
