import Filter from "../components/Filter";
import Pagination from "../components/ui/Pagination";
import ListCard from "../components/products/ListCard";
import { debounce } from "lodash";
import { useProduct } from "../context";

export default function ProductPage() {
  const { filterBySearch } = useProduct();

  // Debounce para manejar el tiempo de espera antes de realizar la búsqueda
  const handleSearch = debounce((e) => {
    console.log("🚀 ~ handleSearch ~ e.target.value:", e.target.value);
    filterBySearch(e.target.value);
  }, 500); // 500ms de retraso

  return (
    <>
      <nav className="w-[90%] flex justify-end flex-col md:flex-row  md:w-[95%] gap-5 mx-auto pr-3 mt-5 ">
        <input
          type="text"
          name=""
          id=""
          className="w-full px-3 py-2"
          placeholder="Buscar Producto"
          onChange={handleSearch}
        />
        <Filter />
      </nav>
      <section className="mb-5 h-full">
        <ListCard />
      </section>

      <Pagination />
    </>
  );
}
