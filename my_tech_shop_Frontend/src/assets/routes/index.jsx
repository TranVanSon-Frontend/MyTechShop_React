// src/router/index.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductsPage from "../pages/ProductsPageAll.jsx/ProductsPage";
import HomePage from "../pages/HomePage.jsx/Home";
import ProductsDetailPage from "../pages/ProductsDetails.jsx/ProductsDetailPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Header from "../components/Header"; // Import Header
import Footer from "../components/Footer"; // Import Footer
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import AdminPages from "../admin/AdminPages"
const AppRouter = () => {
  return (
    <Router>
      <Header /> {/* Header hiển thị ở mọi trang */}
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          {/* Định nghĩa route mặc định */}
          <Route path="/" element={<HomePage />} />

          {/* Định nghĩa route cho sản phẩm điện thoại */}
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductsDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Cart" element={<Cart/>}/>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<AdminPages/>}/>
          {/* Các route khác nếu cần */}
        </Routes>
      </main>
      <Footer /> {/* Footer hiển thị ở mọi trang */}
    </Router>
  );
};

export default AppRouter;
