import ListProduct from "../components/products/ListProduct";
import FormModal from "../components/products/FormModal";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/ui/Pagination";
import { debounce } from "lodash";
import { useProduct } from "../context";

export default function DashboarPage() {
  const navegate = useNavigate();
  const { filterBySearch } = useProduct();

  // Debounce para manejar el tiempo de espera antes de realizar la búsqueda
  const handleSearch = debounce((e) => {
    filterBySearch(e.target.value);
  }, 500); // 500ms de retraso

  return (
    <>
      <section className="flex justify-between mt-5 w-[90%] m-auto md:w[95%]">
        <h1 className="text-xl md:text-2xl font-semibold">
          Administración de Productos
        </h1>
        <Button
          onClick={() => navegate("?newproduct=true")}
          variant="default"
          className=" text-sm bg-yellow-400 text-black font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300"
        >
          Añadir
        </Button>
      </section>
      <main className="flex-1 overflow-auto p-6">
        <input
          type="text"
          name=""
          id=""
          className="w-full px-3 py-2"
          placeholder="Buscar Producto"
          onChange={handleSearch}
        />
        <div className="mt-5">
          <ListProduct />
        </div>
      </main>
      <Pagination />
      <FormModal />
    </>
  );
}
