import { Category } from "../model/category.model.js";

export const createCategories = async () => {
  try {
    const category = await Category.estimatedDocumentCount();
    if (category > 0) return;
    const values = await Promise.allSettled([
      new Category({ name: "Galleta" }).save(),
      new Category({ name: "Caramelo" }).save(),
      new Category({ name: "Chupetin" }).save(),
      new Category({ name: "Jugo" }).save(),
      new Category({ name: "Chocolate" }).save(),
      new Category({ name: "Gomas" }).save(),
      new Category({ name: "Chicles" }).save(),
      new Category({ name: "Agua" }).save(),
      new Category({ name: "Leche" }).save(),
      new Category({ name: "Nutella" }).save(),
      new Category({ name: "Vario" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.log(error);
  }
};
