import { useEffect, useState } from "react";
import { useAuth, useProduct } from "../../context";

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
  }, [windowSize]);

  const handleAvailability = async (id) => {
    await updateAvailable(id);
    await getProduct();
  };

  return (
    <div
      className={`bg-white min-h-[200px] min-w-full relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 ${
        !items.availability ? "grayscale cursor-not-allowed" : "hover:scale-105"
      }  md:max-w-full`}
    >
      {!items.availability && (
        <p className="w-full absolute top-[0%] left-[0%] py-5 flex justify-center items-center text-4xl md:text-2xl md:py-2 text-white bg-zinc-600 font-bold  z-10 ">
          Sin Stock
        </p>
      )}

      <img
        src={items.image}
        alt={`imagen de ${items.name}`}
        loading="lazy"
        className={`w-full h-full rounded-lg shadow-md transition-transform duration-300 object-container md:scale-75`}
      />
      <div className="bg-white p-4 dark:bg-[#333333]">
        <div className="flex flex-col md:flex-row md:justify-between">
          <h3 className="font-bold text-xs md:text-[10px] text-[#333333] dark:text-white order-2 md:order-1">
            {windowSize.width < 700
              ? lo.length > 18
                ? lo.slice(0, 15) + "..."
                : lo
              : lo}
          </h3>
          <h4 className="font-semibold text-sm md:text-md text-secondaryDarck order-1 md:order-2">
            ${items.price}
          </h4>
        </div>

        <p className="text-[10px] text-[#333333] dark:text-white">
          {items.description}
        </p>
      </div>
      {isAuth && (
        <div
          className=" text-center text-2xl  py-2 text-white bg-secondary hover:bg-secondaryDarck cursor-pointer"
          onClick={() => handleAvailability(items._id)}
        >
          Stock
        </div>
      )}
    </div>
  );
}
