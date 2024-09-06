import { useAuth, useProduct } from "../../context";
import { useCallback, useEffect, useState } from "react";

export default function Card({ items }) {
  const { isAuth } = useAuth();
  const { updateAvailable, getProduct } = useProduct();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const lo = items.name.toUpperCase();

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAvailability = useCallback(
    async (id) => {
      await updateAvailable(id);
      await getProduct(); // Podrías optimizar esto actualizando solo el producto, no todos
    },
    [updateAvailable, getProduct]
  );

  return (
    <div
      className={`bg-white dark:bg-[#333333]  min-h-[300px] w-full relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 ${
        !items.availability ? "grayscale cursor-not-allowed" : "hover:scale-105"
      } md:max-w-full`}
    >
      {!items.availability && (
        <p className="w-full py-1 absolute top-0 left-0 flex justify-center items-center text-md text-white font-bold bg-red-950 rounded-lg">
          Sin Stock
        </p>
      )}

      {/* Implementar lazy loading para la imagen */}
      <img
        loading="lazy" // Lazy loading de la imagen
        src={items.image}
        alt={`imagen de ${items.name}`}
        className="w-full h-full object-cover rounded-t-lg"
      />
      <div className="bg-white p-4 dark:bg-[#333333] flex flex-col justify-between h-full">
        <h4 className="font-semibold text-lg md:text-md text-secondaryDarck ">
          ${items.price}
        </h4>
        <h3 className="font-bold text-sm md:text-md text-[#333333] dark:text-white truncate">
          {windowSize.width < 700
            ? lo.length > 18
              ? lo.slice(0, 15) + "..."
              : lo
            : lo}
        </h3>
        <p className="text-sm text-[#333333] dark:text-white mt-2">
          {items.description}
        </p>
      </div>

      {/* Mostrar el botón de stock solo si el usuario está autenticado */}
      {isAuth && (
        <div
          className="text-center text-2xl py-2 text-white bg-secondary hover:bg-secondaryDark cursor-pointer"
          onClick={() => handleAvailability(items._id)}
        >
          Stock
        </div>
      )}
    </div>
  );
}
