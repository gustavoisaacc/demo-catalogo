import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import ProductForm from "./ProducForm";
import { toast } from "react-toastify";
import { Button } from "../ui/Button";
import { useProduct } from "../../context";

export default function AddProductModal() {
  //hook para crear producto
  const [previewImage, setPreviewImage] = useState(null);

  const { createProduct, products, updateProduct, getProduct } = useProduct();
  // //obteniendo si el modal exite
  const navitage = useNavigate();
  const location = useLocation();
  const queyParams = new URLSearchParams(location.search);
  const query = queyParams.get("newproduct");
  const productId = queyParams.get("id");

  const show = query || productId ? true : false;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  let productToEdit;
  // Obtener el producto existente si estamos en modo de edición
  if (productId) {
    productToEdit = products.find((product) => product._id === productId);
  }

  useEffect(() => {
    if (productToEdit) {
      // Rellenar el formulario con los datos del producto existente
      setValue("name", productToEdit.name);
      setValue("price", productToEdit.price);
      setValue("description", productToEdit.description);
      setPreviewImage(productToEdit);
    }
  }, [productToEdit, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    console.log("🚀 ~ onSubmit ~ productToEdit:");
    if (productToEdit) {
      console.log("🚀 ~ onSubmit ~ data:", data);

      const formData = new FormData();

      // Agregar datos al formData
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("image", previewImage.image);
      formData.append("description", data.description);

      // Modo de edición
      const res = await updateProduct(productId, formData);
      console.log("🚀 ~ onSubmit ~ res:", res);
      toast.success("Producto actualizado exitosamente");
    } else {
      const formData = new FormData();

      // Agregar datos al formData
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);

      // Verificar que haya un archivo de imagen
      if (data.image.length > 0) {
        formData.append("image", data.image[0]); // La imagen está en un arreglo
      } else {
        toast.error("Por favor, selecciona una imagen.");
        return;
      }
      // Modo de creación
      const res = await createProduct(formData);
      console.log(res);
      toast.success("Producto agregado exitosamente");
    }
    getProduct();
    reset(); // Limpiar el formulario
    navitage("/dashboard");
  });

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          open={show}
          onClose={() => {
            reset();
            setPreviewImage(null);
            navitage(location.pathname);
          }}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <DialogTitle as="h3" className="font-black text-4xl  my-5">
                    Producto
                  </DialogTitle>

                  <form
                    onSubmit={onSubmit}
                    className=" mt-10 bg-white shadow-lg p-10 round-lg "
                  >
                    {previewImage && (
                      <img
                        src={previewImage.image}
                        alt="Vista previa"
                        className="mt-4 max-w-xs"
                      />
                    )}
                    <ProductForm
                      setPreviewImage={setPreviewImage}
                      register={register}
                      errors={errors}
                      productToEdit={productToEdit}
                      setValue={setValue}
                    />

                    <Button
                      variant="default"
                      className="bg-secondary hover:bg-secondaryDarck w-full mt-5"
                    >
                      {productToEdit ? "Edit" : "Create"}
                    </Button>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
