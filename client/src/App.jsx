import { Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import ProductPage from "./page/ProductPage";
import DashboarPage from "./page/DashboarPage";
import Layout from "./layout/Layout";
import LayoutC from "./layout/LayoutC";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "./page/NotFound";

function App() {
  return (
    <div className="bg-gradient-to-b from-orange-300 to-orange-500  min-h-screen w-full">
      <Routes>
        <Route element={<LayoutC />}>
          <Route path="/" element={<h1>HOME</h1>} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/new-product" element={<DashboarPage />} />
          <Route path="/dashboard" element={<h1>Administrador</h1>} />
          <Route path="/orders" element={<h1>Pedidos</h1>} />
          <Route path="/new-promotions" element={<h1>Promociones</h1>} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored" // Cambia a "dark" o "light" según prefieras
      />
    </div>
  );
}

export default App;
