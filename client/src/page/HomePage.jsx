import Filter from "../components/Filter";
import Pagination from "../components/ui/Pagination";
import ListCard from "../components/products/ListCard";
import { debounce } from "lodash";
import { useProduct } from "../context";
import SellerDropdown from "../components/products/ContactButton";

export default function HomePage() {
  const { filterBySearch } = useProduct();
  const sellers = [
    { id: 1, name: "gustavo", phone: "5493816550959" },
    { id: 2, name: "Vendedor 2", phone: "5491198765432" },
  ];

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

      <div className="fixed bottom-4 right-4 p-4">
        <SellerDropdown sellers={sellers} />
      </div>
    </>
  );
}
