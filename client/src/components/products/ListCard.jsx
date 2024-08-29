import { useProduct } from "../../context";
import CardProdut from "./CardProduct";

function ListCard() {
  const { products, loading } = useProduct();

  if (!Array.isArray(products) || products.length === 0) {
    if (loading) {
      return <p>cargando ...</p>;
    }
    return (
      <p className="text-center text-xl text-white grid place-content-center min-h-screen uppercase">
        no hay productos disponibles
      </p>
    );
  }
  return (
    <div className="grid grid-cols-12 grid-rows-layout gap-5 mt-10 px-10">
      {products.map((product) => (
        <div
          className="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-2 gap-5"
          key={product._id}
        >
          <CardProdut items={product} />
        </div>
      ))}
    </div>
  );
}

export default ListCard;
