import { Outlet } from "react-router-dom";
import Menu from "../components/menu/Menu";
import SellerDropdown from "../components/products/ContactButton";
function LayoutC() {
  const sellers = [
    { id: 1, name: "gustavo", phone: "5493816550959" },
    { id: 2, name: "Vendedor 2", phone: "5491198765432" },
  ];
  return (
    <>
      <header className="bg-primary">
        <Menu />
      </header>
      <main className="h-full">
        <Outlet />
      </main>
      <div className="fixed bottom-4 right-4 p-4">
        <SellerDropdown sellers={sellers} />
      </div>
      <footer className="bg-gray-900 text-slate-800 p-5 text-center">
        <p>Copyright &copy; 2024</p>
      </footer>
    </>
  );
}

export default LayoutC;
