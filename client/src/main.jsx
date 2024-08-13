import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/authContext.jsx";
import { ProductProvider } from "./context/productContext.jsx";
import { CategoryProvider } from "./context/categoryContext.jsx";
import { BrandProvider } from "./context/brandContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CategoryProvider>
            <BrandProvider>
              <App />
            </BrandProvider>
          </CategoryProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
