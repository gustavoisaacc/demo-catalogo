import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
const SellerDropdown = ({ sellers }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full focus:outline-none"
        style={{ width: "56px", height: "56px" }} // Botón redondo
      >
        <FaWhatsapp size={24} />
      </button>
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white border border-gray-300 shadow-md rounded-md p-2 w-56">
          <div className="py-1">
            {sellers.map((seller) => (
              <a
                key={seller.id}
                href={`https://wa.me/${seller.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Contactar a {seller.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDropdown;
