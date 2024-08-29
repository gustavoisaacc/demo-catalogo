import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";

import { toast } from "react-toastify";

import { CiEdit, CiTrash } from "react-icons/ci";

export default function Product({ product, deleteProduct }) {
  const navegate = useNavigate();
  const handleDelete = async (id) => {
    const confirm = window.confirm("Estas seguro de eliminar este producto");
    if (confirm) {
      await deleteProduct(id);
      toast.error("Product deleted");
    }
  };
  return (
    <tr key={product._id} className="border-b hover:bg-gray-100">
      <td className="py-2 px-4">
        <img
          src={product.image}
          alt=""
          className="w-[50px] rounded-full hover:scale-150 "
        />
      </td>
      <td className="py-2 px-4">{product.name}</td>

      <td className="py-2 px-4 text-right">${product.price}</td>
      <td className="py-2 px-4 text-right">{product.stock}</td>
      <td className="py-2 px-4 text-center flex justify-center items-center md:gap-5 flex-col md:flex-row ">
        <Button
          onClick={() => {
            navegate(`?id=${product._id}`);
          }}
          variant="primary"
          className="h-5 w-5 grid place-content-center rounded-full hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-110 md:p-5"
        >
          <CiEdit className="w-3 h-3 md:w-5 md:h-5" />
        </Button>
        {/* Botón de eliminar */}
        <Button
          onClick={() => handleDelete(product._id)}
          variant="danger"
          className="mt-1 h-5 w-5 grid place-content-center rounded-full hover:bg-red-100 transition duration-300 ease-in-out transform hover:scale-110 md:p-5"
        >
          <CiTrash className="w-3 h-3 md:w-5 md:h-5" />
        </Button>
      </td>
    </tr>
  );
}
