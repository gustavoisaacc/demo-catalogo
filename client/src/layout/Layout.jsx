import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context";
import Menu from "../components/menu/Menu";
import { useEffect } from "react";

function Layout() {
  const { isAuth, loading } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      alert("Por favor inicie session");
    }
  }, [isAuth]);

  if (loading)
    return (
      <h1 className="text-center text-xl text-white grid place-content-center min-h-screen uppercase">
        Loading...
      </h1>
    );
  if (!isAuth && !loading) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <header className="bg-primary">
        <Menu />
      </header>
      <main className="h-full min-w-full ">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
