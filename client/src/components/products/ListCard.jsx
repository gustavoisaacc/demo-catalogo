import { useMemo, Suspense, lazy } from "react";
import { useProduct } from "../../context";

// Lazy load de CardProdut para cargar componentes de manera dinámica
const CardProdut = lazy(() => import("./CardProduct"));

function ListCard() {
  const { products, loading } = useProduct();

  // Memorizar los productos para evitar cálculos innecesarios si no hay cambios
  const renderedProducts = useMemo(() => {
    return products.map((product) => (
      <div className="col-span-6 md:col-span-3 lg:col-span-2" key={product._id}>
        <Suspense fallback={<p>Cargando producto...</p>}>
          <CardProdut items={product} />
        </Suspense>
      </div>
    ));
  }, [products]);

  if (!Array.isArray(products) || products.length === 0) {
    if (loading) {
      return (
        <p className="grid place-content-center h-screen text-4xl text-white">
          cargando ...
        </p>
      );
    }
    return (
      <p className="text-center text-xl text-white grid place-content-center min-h-screen uppercase">
        no hay productos disponibles
      </p>
    );
  }

  return (
    <div className="grid grid-cols-12 grid-rows-layout gap-5 mt-10 px-10">
      {renderedProducts}
    </div>
  );
}

export default ListCard;
