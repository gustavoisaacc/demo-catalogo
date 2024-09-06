import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import {
  deleteProductReques,
  getBrandRequest,
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

  // Utilizamos un objeto memoizado para almacenar los productos en caché según la página y los filtros.
  const cachedProducts = useMemo(() => ({}), []);

  const getProduct = useCallback(
    async (
      page = currentPage,
      limit = LIMIT,
      category = currentCategory,
      search = currentSearch
    ) => {
      const cacheKey = `${page}-${category}-${search}`;
      if (cachedProducts[cacheKey]) {
        setProducts(cachedProducts[cacheKey]);
        return;
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

        // Guardamos en caché los productos
        cachedProducts[cacheKey] = res.data.products;

        return res.data;
      } catch (error) {
        console.log(error);
        setError("Hubo un problema al cargar los productos.");
      } finally {
        setLoading(false);
      }
    },
    [currentPage, currentCategory, currentSearch, cachedProducts]
  );

  const getBrand = async (brand) => {
    const res = await getBrandRequest(brand);
    console.log("🚀 ~ getBrand ~ res:", res);
  };

  const filterByCategory = (category) => selectedCategory(category);
  const filterBySearch = (search) => setSearch(search);

  // Optimización: Evitar múltiples actualizaciones del estado "loading"
  const createProduct = async (data) => {
    setLoading(true);
    try {
      const res = await postProductReques(data);
      if (res.status === 200) {
        setProducts((prevProducts) => [...prevProducts, res.data]);
      }
      return res.data;
    } catch (error) {
      setError(error.response?.data?.message || "Error al crear el producto");
    } finally {
      setLoading(false);
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
      setError(
        error.response?.data?.message || "Error al actualizar el producto"
      );
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
    window.scrollTo({ top: 0, behavior: "smooth" });
    getProduct(currentPage, LIMIT, currentCategory, currentSearch);
  }, [currentPage, currentCategory, currentSearch, getProduct]);

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
        getBrand,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
