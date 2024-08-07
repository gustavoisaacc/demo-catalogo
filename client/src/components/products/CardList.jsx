import Card from "./Card";

function CardList({ items }) {
  const { name, description, price, image } = items;
  console.log("🚀 ~ CardList ~ image:", image);
  console.log("🚀 ~ CardList ~ items:", items);

  return (
    <div className=" col-span-12 sm:col-span-6 md:col-span-3 lg:col-span-2 gap-5">
      <Card name={name} description={description} price={price} image={image} />
    </div>
  );
}

export default CardList;
