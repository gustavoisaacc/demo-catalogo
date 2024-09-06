import { imagenesMarcas } from "../utils/imagenes.js";
import Slider from "../components/products/Slider.jsx";
import MapComponent from "../components/Map.jsx";

function HomePage() {
  const locations = [
    { lat: -27.05707429567691, lng: -65.40457777895453 },

    // Más ubicaciones
  ];

  return (
    <>
      <main className="w-full bg-white border-x-2">
        <section className="flex flex-col lg:flex-row pt-10 gap-4 justify-between items-center m-auto w-[95%]">
          <div className="w-full text-center lg:w-[40%]">
            <h1 className="text-4xl font-semibold">Pedrotti</h1>
          </div>
          <MapComponent
            locations={locations}
            className=" w-[95%] lg:w-[50%] z-0"
          />
        </section>
      </main>
      <section className="w-[90%] m-auto">
        <fieldset className="text-white my-5 border-t-2 border-gray-500 border-solid border-x-0 border-b-0 text-center">
          <legend>Marcas</legend>
          <div className="slider-container w-full overflow-hidden cursor-grab">
            <div className="mt-5 slider flex gap-4 snap-x snap-mandatory">
              <Slider imagenesMarcas={imagenesMarcas} />
            </div>
          </div>
        </fieldset>
      </section>
    </>
  );
}

export default HomePage;
