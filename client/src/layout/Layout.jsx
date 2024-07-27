import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context";
import Menu from "../components/menu/Menu";

function Layout() {
  const { isAuth, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  if (!isAuth && !loading) return <Navigate to="/login" replace />;
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

export default Layout;
