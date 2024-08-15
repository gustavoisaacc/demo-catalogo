import ListProduct from "../components/products/ListProduct";
import FormModal from "../components/products/FormModal";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/ui/Pagination";

export default function DashboarPage() {
  const navegate = useNavigate();

  return (
    <>
      <section className="flex justify-between mt-5 w-[90%] m-auto md:w[95%]">
        <h1 className="text-2xl font-semibold">Administración de Productos</h1>
        <Button
          onClick={() => navegate("?newproduct=true")}
          variant="default"
          className="mb-6 bg-secondary hover:bg-secondaryDarck "
        >
          Añadir Producto
        </Button>
      </section>
      <main className="flex-1 overflow-auto p-6">
        <ListProduct />
      </main>
      <Pagination />
      <FormModal />
    </>
  );
}
