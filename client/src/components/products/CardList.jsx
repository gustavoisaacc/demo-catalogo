import Card from "./Card";

function CardList({ items }) {
  return (
    <div className=" col-span-12 sm:col-span-6 md:col-span-3 lg:col-span-2 gap-5">
      <Card items={items} />
    </div>
  );
}

export default CardList;
