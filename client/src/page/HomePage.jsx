import Filter from "../components/Filter";
import CardList from "../components/products/CardList";
import Pagination from "../components/ui/Pagination";

import { useProduct } from "../context";

export default function HomePage() {
  const { products } = useProduct();
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
      <div className="grid grid-cols-12 grid-rows-layout gap-5 mt-10 px-10">
        {products.map((product) => (
          <CardList key={product._id} items={product} />
        ))}
      </div>
      <div className="mt-5">
        <Pagination />
      </div>
    </>
  );
}
