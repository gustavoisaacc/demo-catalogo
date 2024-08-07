import MessageError from "../MessageError";

export default function ProductForm({
  register,
  errors,
  setPreviewImage,
  productToEdit,
  setValue,
}) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("🚀 ~ handleImageChange ~ file:", file);
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
        <label className="font-normal text-2xl" htmlFor="name">
          Imagen
        </label>
        {productToEdit ? (
          <p {...register("image")}>{productToEdit.image}</p>
        ) : (
          <input
            id="image"
            type="file"
            accept="image/*"
            placeholder="Nombre del producto"
            className="w-full p-3  border-gray-300 border"
            {...register("image", {
              required: !productToEdit && "La imagen es obligatorio",
            })}
            onChange={handleImageChange}
          />
        )}
        {errors.name && <MessageError props={errors.name.message} />}
      </div>
      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="name">
          Nombre
        </label>
        <input
          id="name"
          type="text"
          placeholder="Nombre del producto"
          className="w-full p-3  border-gray-300 border"
          {...register("name", {
            required: "El nombre es obligatorio",
          })}
        />
        {errors.name && <MessageError props={errors.name.message} />}
      </div>

      <div className="flex flex-col gap-5 mt-5">
        <label className="font-normal text-2xl" htmlFor="name">
          Precio
        </label>
        <input
          id="price"
          type="text"
          placeholder="Precio"
          className="w-full p-3  border-gray-300 border"
          {...register("price", {
            required: "El precio es obligatorio",
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
        <label className="font-normal text-2xl" htmlFor="description">
          Descripción del producto
        </label>
        <textarea
          id="description"
          placeholder="Descripción de la tarea"
          className="w-full p-3  border-gray-300 border"
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