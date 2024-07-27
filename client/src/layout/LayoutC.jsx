import { Outlet } from "react-router-dom";
import Menu from "../components/menu/Menu";

function LayoutC() {
  return (
    <>
      <header className="bg-primary">
        <Menu />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default LayoutC;
