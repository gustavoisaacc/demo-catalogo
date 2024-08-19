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
  const [currentCategory, selectedCategory] = useState("");
  const [currentSearch, setSearch] = useState("");
  const LIMIT = 20;
  const getProduct = async (
    page = currentPage,
    limit = LIMIT,
    category = currentCategory,
    search = currentSearch
  ) => {
    try {
      setLoading(true);
      const res = await api.get(`/product`, {
        params: {
          page,
          limit,
          category,
          search,
        },
      });
      setProducts(res.data.products);
      setTotalPages(res.data.totalPage);

      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading after API request
    }
  };

  //filter category

  const filterByCategory = async (category) => {
    console.log("🚀 ~ filterCategory ~ category:", category);
    selectedCategory(category);
  };
  const filterBySearch = async (search) => {
    console.log("🚀 ~ filterCategory ~ category:", search);
    setSearch(search);
  };

  //create product
  const createProduct = async (data) => {
    try {
      setLoading(true);
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
    try {
      const res = await isAvailable(id);
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
    getProduct(currentPage, LIMIT, currentCategory, currentSearch);
  }, [currentPage, currentCategory, currentSearch]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        currentPage,
        totalPages,
        error,
        currentCategory,
        setCurrentPage,
        createProduct,
        updateProduct,
        getProduct,
        deleteProduct,
        updateAvailable,
        filterByCategory,
        filterBySearch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
