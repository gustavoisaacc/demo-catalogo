import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context";
import Menu from "../components/menu/Menu";

function Layout() {
  const { isAuth, loading } = useAuth();

  if (loading)
    return (
      <h1 className="text-center text-xl text-white grid place-content-center min-h-screen uppercase">
        Loading...
      </h1>
    );
  if (!isAuth && !loading) {
    alert("Por favor inicie session");
    return <Navigate to="/admin/login" replace />;
  }
  return (
    <>
      <header className="bg-primary">
        <Menu />
      </header>
      <main className="h-full ">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
