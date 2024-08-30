import Carousel from "../components/Crousel";

function HomePage() {
  return (
    <>
      <main className="w-full  bg-white border-x-2">
        <section className="flex flex-col lg:flex-row pt-10 gap-4 justify-between items-center m-auto w-[95%]">
          <div className=" w-full text-center lg:w-[40%] ">
            <h1 className="text-4xl font-semibold">Promos de la semana</h1>
          </div>
          <div className=" w-full lg:w-[60%] p-5 ">
            <Carousel />
          </div>
        </section>
      </main>
      <section className="w-[95%] m-auto">
        <fieldset className="border-t-2 border-gray-500 border-solid border-x-0 border-b-0 text-center">
          <legend className="">Marcas</legend>
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            recusandae soluta similique earum sunt explicabo labore nam amet
            quos, quisquam eveniet vel cum natus tenetur rerum est impedit quod
            quaerat!
          </h1>
        </fieldset>
        {/* Aquí se cargan los productos */}
      </section>
      <section className="w-[95%] m-auto mt-10">
        <fieldset className="border-t-2 border-gray-500 border-solid border-x-0 border-b-0 text-center">
          <legend className="">Categoria</legend>
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            recusandae soluta similique earum sunt explicabo labore nam amet
            quos, quisquam eveniet vel cum natus tenetur rerum est impedit quod
            quaerat!
          </h1>
        </fieldset>
        {/* Aquí se cargan los productos */}
      </section>
    </>
  );
}

export default HomePage;
