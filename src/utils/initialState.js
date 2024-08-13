import { Brand } from "../model/brand.js";
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
export const createBrand = async () => {
  try {
    const brand = await Brand.estimatedDocumentCount();
    if (brand > 0) return;
    const values = await Promise.allSettled([
      new Brand({ name: "Misky" }).save(),
      new Brand({ name: "Lia" }).save(),
      new Brand({ name: "Arcor" }).save(),
      new Brand({ name: "Marengo" }).save(),
      new Brand({ name: "Georgalos" }).save(),
      new Brand({ name: "Lheritier" }).save(),
      new Brand({ name: "Mauri" }).save(),
      new Brand({ name: "Vario" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.log(error);
  }
};
