import { useCategory, useProduct } from "../context";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { MENULI } from "../utils/navegate";

export default function Filter() {
  const { category } = useCategory();
  const { filterByCategory } = useProduct();

  const navigate = useNavigate();

  const handleChangeCategory = (e) => {
    const selectedCategory = e.target.value;

    // Filter products based on the selected category
    filterByCategory(selectedCategory);
    navigate(`?category=${selectedCategory}`, { replace: true });
  };
  return (
    <div>
      <select className=" py-2 px-3 w-full" onChange={handleChangeCategory}>
        <option value="">All Categories</option>
        {category.map((list) => {
          return (
            <option value={list.name} key={list._id}>
              {list.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
