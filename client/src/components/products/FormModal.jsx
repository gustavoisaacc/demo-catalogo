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
import { useCategory, useProduct } from "../../context";

export default function AddProductModal() {
  //hook para crear producto
  const [previewImage, setPreviewImage] = useState(null);

  const { createProduct, products, updateProduct, getProduct, loading } =
    useProduct();
  const { category } = useCategory();
  // //obteniendo si el modal exite
  const navitage = useNavigate();
  const location = useLocation();
  const queyParams = new URLSearchParams(location.search);
  const query = queyParams.get("newproduct");
  const productId = queyParams.get("id");

  const show = query || productId ? true : false;
  let productToEdit;
  const initialValue = {
    name: "",
    price: "",
    description: "",
    category: "",
    brand: "",
    image: null,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm(initialValue || productToEdit);
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
      setValue("category", productToEdit.category._id);
      setValue("brand", productToEdit.brand._id);
      setPreviewImage(productToEdit);
    }
  }, [productToEdit, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("price", parseFloat(data.price));
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("brand", data.brand);

      // Verificar y añadir la imagen si está presente
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      } else if (!productToEdit) {
        setError("image", {
          type: "manual",
          message: "Por favor, selecciona una imagen.",
        });
        return;
      }

      let res;
      if (productToEdit) {
        res = await updateProduct(productId, formData);
      } else {
        res = await createProduct(formData);
        console.log("🚀 ~ onSubmit ~ res:", res);
      }

      if (res.message === "Invalid credential") {
        toast.error(res.message);
        return navitage("/");
      }

      if (res.error) {
        // Configura errores en react-hook-form
        return res.error.issues.forEach((err) => {
          setError(err.path[0], {
            type: "manual",
            message: err.message,
          });
        });
      } else {
        toast.success(
          productToEdit
            ? "Producto actualizado exitosamente"
            : "Producto creado exitosamente"
        );
      }
      getProduct();
      setPreviewImage(null);
      reset();
      navitage("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Ocurrió un error al procesar la solicitud.");
      navitage("/login");
    }
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
                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-5 md:p-16">
                  <DialogTitle
                    as="h3"
                    className="font-black text-xl md:text-4xl  my-5"
                  >
                    <button
                      className="absolute top-20 right-16"
                      onClick={() => {
                        reset();
                        setPreviewImage(null);
                        navitage(location.pathname);
                        productToEdit = "";
                      }}
                    >
                      x
                    </button>
                    Producto
                  </DialogTitle>

                  <form
                    onSubmit={onSubmit}
                    className=" mt-10 bg-white shadow-lg p-3 md:p-10 round-lg "
                  >
                    {previewImage && (
                      <img
                        src={previewImage || previewImage.image}
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
                      category={category}
                    />
                    <Button
                      variant="default"
                      className="bg-secondary hover:bg-secondaryDarck w-full mt-5"
                    >
                      {loading
                        ? "Guardando..."
                        : productToEdit
                        ? "Edit"
                        : "Create"}
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
