import { Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import HomePage from "./page/HomePage";
import DashboarPage from "./page/DashboarPage";
import Layout from "./layout/Layout";
import LayoutC from "./layout/LayoutC";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "./page/NotFound";

function App() {
  return (
    <div className="bg-black-to-gray min-h-screen w-full">
      <Routes>
        <Route element={<LayoutC />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboarPage />} />
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
