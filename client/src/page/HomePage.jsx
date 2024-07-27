import CardList from "../components/products/CardList";

export default function HomePage() {
  const produc = [
    {
      id: 1,
      title: "Product 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 19.99,
      image:
        "https://i0.wp.com/www.gastongbg.com/wp-content/uploads/2022/04/Compartido-desde-Lightroom-mobile-e1648940739620.jpg?fit=1920%2C1082&ssl=1",
    },
  ];
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 `}>
      <CardList items={produc} />
    </div>
  );
}
