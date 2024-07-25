import { Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import HomePage from "./page/HomePage";
import DashboarPage from "./page/DashboarPage";
import Layout from "./layout/Layout";

function App() {
  return (
    <div className="bg-black-to-gray h-screen w-full">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboarPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
