import { useState } from "react";
import { useProduct } from "../../context";
import { Button } from "./Button";

export default function Pagination() {
  const { currentPage, totalPages, setCurrentPage } = useProduct();
  console.log("🚀 ~ Pagination ~ currentPage:", currentPage === 1);

  const [isDisabledNext, setIsDisabledNext] = useState(false);
  const [isDisabledPrev, setIsDisabledPrev] = useState(false);
  const handleNextPage = () => {
    console.log("🚀 ~ Pagination ~ totalPages:", totalPages);
    if (currentPage < totalPages) {
      console.log(currentPage);
      setCurrentPage(currentPage + 1);
    }
    if (currentPage === totalPages) {
      setIsDisabledNext(true);
      setIsDisabledPrev(false);
    } else {
      setIsDisabledNext(false);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      console.log(currentPage);
      setCurrentPage(currentPage - 1);
      setIsDisabledNext(false);
    }
    if (currentPage === 1) {
      setIsDisabledPrev(true);
    } else {
      setIsDisabledPrev(false);
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
