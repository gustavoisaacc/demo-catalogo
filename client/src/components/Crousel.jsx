import { useProduct } from "../context";
import LisrCarousel from "./ListCarousel";

function Carousel() {
  const { products } = useProduct();
  return (
    <div className="w-full">
      <LisrCarousel autoSlide={true}>
        {products.map((item) => (
          <img
            key={item.id} // Asegúrate de que cada item tenga una key única
            src={item.image}
            alt={item.name}
            className="object-contain h-full min-w-full"
          />
        ))}
      </LisrCarousel>
    </div>
  );
}

export default Carousel;
