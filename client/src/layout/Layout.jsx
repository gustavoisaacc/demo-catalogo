import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className=" bg-slate-800 h-screen w-screen">
      <Outlet />
    </div>
  );
}

export default Layout;
