import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";

import { toast } from "react-toastify";

import { CiEdit, CiTrash } from "react-icons/ci";

export default function Product({ product, deleteProduct }) {
  const navegate = useNavigate();
  const handleDelete = async (id) => {
    const confirm = window.confirm("Estas seguro de eliminar este producto");
    if (confirm) {
      const res = await deleteProduct(id);
      console.log(res);
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
      <td className="py-2 px-4 text-center flex place-content-center flex-col md:flex-row ">
        <Button
          onClick={() => {
            navegate(`?id=${product._id}`);
          }}
          variant="primary"
          className=" mr-2 p-2 rounded-full hover:bg-blue-100 transition duration-300 ease-in-out transform hover:scale-110 z-0"
        >
          <CiEdit className="w-3 h-3 md:w-5 md:h-5" />
        </Button>
        {/* Botón de eliminar */}
        <Button
          onClick={() => handleDelete(product._id)}
          variant="danger"
          className="p-1 rounded-full hover:bg-red-100 transition duration-300 ease-in-out transform hover:scale-110 z-0"
        >
          <CiTrash className="w-3 h-3 md:w-5 md:h-5" />
        </Button>
      </td>
    </tr>
  );
}
