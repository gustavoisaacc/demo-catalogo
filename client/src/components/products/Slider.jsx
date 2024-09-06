import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./slider.css";

const Slider = ({ imagenesMarcas }) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Duplicamos las imágenes para el efecto infinito
  const duplicatedImages = [
    ...imagenesMarcas,
    ...imagenesMarcas,
    ...imagenesMarcas,
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    const handleResize = () => {
      slider.scrollLeft = slider.scrollWidth / 3; // Posicionamos el scroll en la mitad
    };

    handleResize(); // Ajustamos la posición inicial

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    const handleScroll = () => {
      if (slider.scrollLeft <= 0) {
        slider.scrollLeft = slider.scrollWidth / 3;
      } else if (slider.scrollLeft >= (slider.scrollWidth * 2) / 3) {
        slider.scrollLeft = slider.scrollWidth / 3;
      }
    };

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="slider-container overflow-hidden cursor-grab m-auto"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={sliderRef}
      style={{ overflow: "hidden" }} // Asegura que no haya scroll horizontal
    >
      <div className="flex gap-4" style={{ display: "flex" }}>
        {duplicatedImages.map((img, i) => (
          <Link className="flex-shrink-0" to={"/products"} key={i}>
            <img
              src={img}
              alt={`brand-${i}`}
              className="slider-item w-full h-32 object-cover"
              style={{ flex: "0 0 auto" }} // Asegura que las imágenes no se expandan
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Slider;
