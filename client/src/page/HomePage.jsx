import Filter from "../components/Filter";
import Pagination from "../components/ui/Pagination";

import ListCard from "../components/products/ListCard";

export default function HomePage() {
  return (
    <>
      <nav className="w-[90%] flex justify-end flex-col md:flex-row  md:w-[95%] gap-5 mx-auto pr-3 mt-5 ">
        <input
          type="text"
          name=""
          id=""
          className="w-full px-3 py-2"
          placeholder="Buscar Producto"
        />
        <Filter />
      </nav>
      <section className="mb-5">
        <ListCard />
      </section>

      <Pagination />
    </>
  );
}
