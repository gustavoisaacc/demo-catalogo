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

  const [cachedPages, setCachedPages] = useState({});

  const getProduct = async (
    page = currentPage,
    limit = LIMIT,
    category = currentCategory,
    search = currentSearch
  ) => {
    const cacheKey = `${page}-${category}-${search}`;

    // Verificar si la página ya está en caché
    if (cachedPages[cacheKey]) {
      setProducts(cachedPages[cacheKey].products);
      setTotalPages(cachedPages[cacheKey].totalPages);
      return cachedPages[cacheKey];
    }

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

      // Almacenar los datos en el caché
      setCachedPages((prevCache) => ({
        ...prevCache,
        [cacheKey]: {
          products: res.data.products,
          totalPages: res.data.totalPage,
        },
      }));

      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //filter category

  const filterByCategory = async (category) => {
    selectedCategory(category);
  };
  const filterBySearch = async (search) => {
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
      console.log("🚀 ~ createProduct ~ error:", error);
      setError(error.response.data.menssage);
      setLoading(false);
      return error.response.data;
    }
  };
  const updateProduct = async (id, data) => {
    try {
      const res = await updateProductReques(id, data);
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
      setError(error.response.data.message);
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
      setError(error.response.data.message);
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
