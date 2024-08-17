import { Outlet } from "react-router-dom";
import Menu from "../components/menu/Menu";

function LayoutC() {
  return (
    <>
      <header className="bg-primary">
        <Menu />
      </header>
      <main className="h-full">
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-slate-800 p-5 text-center">
        <p>Copyright &copy; 2024</p>
      </footer>
    </>
  );
}

export default LayoutC;
