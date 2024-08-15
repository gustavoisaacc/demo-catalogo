import { useEffect } from "react";
import { useAuth, useProduct } from "../../context";
export default function Card({ items }) {
  const { isAuth } = useAuth();
  const { updateAvailable, getProduct } = useProduct();
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div
      className={`min-h-[200px] min-w-40 bg-white relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 ${
        !items.availability ? "grayscale cursor-not-allowed" : "hover:scale-105"
      }  md:max-w-full`}
    >
      {!items.availability && (
        <p className="w-full absolute top-[0%] left-[0%] py-5 flex justify-center items-center text-4xl text-white font-bold bg-red-950">
          Sin Stock
        </p>
      )}

      <img
        src={items.image}
        alt={`imagen de ${items.name}`}
        className={`w-full h-full rounded-lg shadow-md transition-transform duration-300 `}
      />
      <div className="bg-white p-4 dark:bg-[#333333]">
        <div className="flex justify-between md:block">
          <h3 className="font-bold text-lg md:text-md text-[#333333]">
            {items.name}
          </h3>
          <h4 className="font-semibold text-lg md:text-md text-secondaryDarck">
            ${items.price}
          </h4>
        </div>
        <p className="text-sm text-[#333333]">{items.description}</p>
      </div>
      {isAuth && (
        <div
          className=" text-center text-2xl  py-2 text-white bg-secondary hover:bg-secondaryDarck cursor-pointer"
          onClick={() => updateAvailable(items._id)}
        >
          Stock
        </div>
      )}
    </div>
  );
}
