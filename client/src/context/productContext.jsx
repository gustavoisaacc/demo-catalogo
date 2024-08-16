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
  const [error, setError] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getProduct = async (page = currentPage, limit = 5) => {
    try {
      setLoading(true);
      const res = await api.get(`/product`, {
        params: {
          page,
          limit,
        },
      });
      setProducts(res.data.products);
      setTotalPages(res.data.totalPage);
      console.log("🚀 ~ getProduct ~ page:", currentPage);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading after API request
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
    console.log("🚀 ~ useEffect ~ currentPage:", currentPage);
    getProduct(currentPage);
  }, [currentPage]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        currentPage,
        totalPages,
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
