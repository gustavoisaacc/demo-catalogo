import { useState } from "react";
import { useProduct } from "../../context";
import Product from "./Product";

export default function ListProduct() {
  const { products, loading, deleteProduct } = useProduct();

  if (!Array.isArray(products)) {
    if (loading) {
      return <p>cargando ...</p>;
    }
    return <p>no hay</p>;
  }
  return (
    <>
      <table className="w-full border-collapse text-[10px] md:text-lg">
        <thead>
          <tr className="bg-[#2C3E50] text-white">
            <th className="py-2 px-4 text-left">imagen</th>
            <th className="py-2 px-4 text-left">Nombre</th>
            <th className="py-2 px-4 text-right">Precio</th>
            <th className="py-2 px-4 text-right">Stock</th>
            <th className="py-2 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              deleteProduct={deleteProduct}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
