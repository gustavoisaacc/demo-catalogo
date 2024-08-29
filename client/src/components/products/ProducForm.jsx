import { useBrand } from "../../context";
import MessageError from "../MessageError";

export default function ProductForm({
  register,
  errors,
  setPreviewImage,
  productToEdit,
  category,
}) {
  const { brand } = useBrand();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Mostrar vista previa de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 mb-5">
        <label className="font-normal text-md md:text-2xl" htmlFor="name">
          Imagen
        </label>
        {productToEdit ? (
          <p {...register("image")}>{productToEdit.image}</p>
        ) : (
          <input
            id="image"
            type="file"
            accept="image/*"
            className="w-full p-3  border-gray-300 border placeholder:text-md"
            {...register("image", {
              required: !productToEdit && "La imagen es obligatorio",
            })}
            onChange={handleImageChange}
          />
        )}
        {errors.image && <MessageError props={errors.image.message} />}
      </div>
      <div className="flex flex-col gap-5">
        <label className="font-normal text-md md:text-2xl" htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nombre del producto"
          className="w-full p-3  border-gray-300 border placeholder:text-md"
          {...register("name", {
            required: "El nombre es obligatorio",
          })}
        />
        {errors.name && <MessageError props={errors.name.message} />}
      </div>
      <div className="flex flex-col gap-5">
        <select
          id="category"
          className="py-3 mt-5 outline-none border text-md p-2"
          defaultValue=""
          {...register("category", {
            required: "La categoría es obligatoria",
          })}
        >
          <option value="" disabled>
            Seleccione una categoría
          </option>
          {category.map((item) => (
            <option value={item._id} key={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        {errors.category && <MessageError props={errors.category.message} />}
      </div>
      <div className="flex flex-col gap-5">
        <select
          id="brand"
          className="py-3 mt-5 outline-none border text-md p-2"
          defaultValue=""
          {...register("brand", {
            required: "La categoría es obligatoria",
          })}
        >
          <option value="" disabled>
            Seleccione una marca del producto
          </option>
          {brand.map((item) => (
            <option value={item._id} key={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        {errors.brand && <MessageError props={errors.brand.message} />}
      </div>
      <div className="flex flex-col gap-5 mt-5 ">
        <label className="font-normal text-md md:text-2xl" htmlFor="name">
          Precio
        </label>
        <input
          id="price"
          type="text"
          placeholder="Precio"
          className="w-full p-3  border-gray-300 border placeholder:text-md"
          {...register("price", {
            required: "El precio es obligatorio",
            valueAsNumber: true,
            validate: {
              positive: (value) =>
                parseFloat(value) >= 0 || "El precio debe ser positivo",
              number: (value) =>
                !isNaN(parseFloat(value)) || "Debe ser un número válido",
            },
          })}
        />
        {errors.price && <MessageError props={errors.price.message} />}
      </div>

      <div className="flex flex-col gap-5 mt-5">
        <label
          className="font-normal text-md md:text-2xl"
          htmlFor="description"
        >
          Descripción del producto
        </label>
        <textarea
          id="description"
          placeholder="Descripción de la tarea"
          className="w-full p-3  border-gray-300 border placeholder:text-md"
          {...register("description", {
            required: "La descripción  es obligatoria",
          })}
        />
        {errors.description && (
          <MessageError props={errors.description.message} />
        )}
      </div>
    </>
  );
}
