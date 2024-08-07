import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config/firebase.js";
import sharp from "sharp";

export const uploadFile = async (file) => {
  let fileBuffer = await sharp(file.buffer)
    .resize({ width: 200, height: 200, fit: "cover" })
    .toBuffer();

  const fileRef = ref(storage, `file/${file.originalname + " " + Date.now()}`);
  const fileData = {
    contentType: file.mimeType,
  };
  const fileUploadPromise = uploadBytesResumable(fileRef, fileBuffer, fileData);
  await fileUploadPromise;
  const fileDownloadUrl = await getDownloadURL(fileRef);
  return {
    ref: fileRef,
    downloadUrl: fileDownloadUrl,
  };
};
export async function deleteFile(imageUrl) {
  try {
    const fileRef = ref(storage, imageUrl);
    await deleteObject(fileRef);
    console.log("Imagen eliminada con éxito.");
  } catch (error) {
    console.error("Error eliminando la imagen:", error);
  }
}
// Función para obtener la URL de la imagen actual
export const getImageUrl = async (imagePath) => {
  try {
    const imageRef = ref(storage, imagePath);
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error al obtener la URL de la imagen:", error);
    return null;
  }
};
