import { useEffect, useState } from "react";
import { useProduct } from "../../context";
import { Button } from "./Button";
import { useLocation, useNavigate } from "react-router-dom";

export default function Pagination() {
  const { currentPage, totalPages, setCurrentPage } = useProduct();

  const [isDisabledNext, setIsDisabledNext] = useState(false);
  const [isDisabledPrev, setIsDisabledPrev] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateButtonState = () => {
      setIsDisabledPrev(currentPage <= 1);
      setIsDisabledNext(currentPage >= totalPages);
      console.log("🚀 ~ updateButtonState ~ totalPages:", totalPages);
    };

    updateButtonState();
  }, [currentPage, totalPages]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      navigate(`?page=${newPage}`); // Actualiza la URL con la nueva página
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      navigate(`?page=${newPage}`); // Actualiza la URL con la nueva página
    }
  };
  return (
    <div className="flex place-content-center m-auto gap-10">
      <Button
        className={`bg-secondary hover:bg-secondaryDarck ${
          isDisabledPrev && "opacity-50 cursor-not-allowed"
        }`}
        disabled={isDisabledPrev}
        onClick={handlePrevPage}
      >
        Prev
      </Button>
      <Button
        className={`bg-secondary hover:bg-secondaryDarck ${
          isDisabledNext && "opacity-50 cursor-not-allowed"
        }`}
        disabled={isDisabledNext}
        onClick={handleNextPage}
      >
        next
      </Button>
    </div>
  );
}
