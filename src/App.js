import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import AdminPanel from "./components/AdminPanel";
import UserDashboard from "./components/UserDashboard";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Home from "./components/HomePage";
import UserOrders from "./components/UserOrders";
import AboutUs from "./components/AboutUs";
import OrderConfirmation from "./components/OrderConfirmation";
import ProductDetails from "./components/ProductDetails";
import AdminRatings from "./components/AdminRatings";

import "./styles.css"; // Import global styles

const App = () => {
  const [authRole, setAuthRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Persist authentication state & user ID on page refresh
  useEffect(() => {
    const savedRole = localStorage.getItem("authRole");
    const storedUserId = localStorage.getItem("userId");

    if (savedRole) setAuthRole(savedRole);
    if (storedUserId) setUserId(storedUserId);

    setLoading(false);
  }, []);

  // ✅ Fetch latest products from backend
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Handle login
  const handleLogin = (role, userId) => {
    setAuthRole(role);
    setUserId(userId);
    localStorage.setItem("authRole", role);
    localStorage.setItem("userId", userId);
  };

  // ✅ Handle logout
  const handleLogout = () => {
    setAuthRole(null);
    setUserId(null);
    localStorage.removeItem("authRole");
    localStorage.removeItem("userId");
  };

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <Router>
      <DynamicBackground>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* ✅ Admin Routes */}
          <Route
            path="/admin"
            element={authRole === "admin" ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin-panel"
            element={authRole === "admin" ? <AdminPanel products={products} setProducts={setProducts} fetchProducts={fetchProducts} onLogout={handleLogout} /> : <Navigate to="/login" />}
          />

          {/* ✅ User Routes */}
          <Route
            path="/user"
            element={
              authRole === "user" ? (
                <UserDashboard products={products} setProducts={setProducts} cart={cart} setCart={setCart} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/cart"
            element={
              authRole === "user" ? (
                <Cart cart={cart} setCart={setCart} setOrders={setOrders} products={products} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/order-confirmation"
            element={authRole === "user" ? <OrderConfirmation userId={userId} orders={orders} /> : <Navigate to="/login" />}
          />

          {/* ✅ Admin Only - View User Orders */}
          <Route path="/user-orders" element={authRole === "admin" ? <UserOrders orders={orders} /> : <Navigate to="/login" />} />

          {/* ✅ Product Details Route */}
          <Route path="/product/:productId" element={<ProductDetails products={products} cart={cart} setCart={setCart} />} />

          {/*✅ Add this route inside */}
          <Route
          path="/admin-ratings"
          element={authRole === "admin" ? <AdminRatings /> : <Navigate to="/login" />}
          />

          {/* ✅ Redirect unknown routes based on authRole */}
          <Route
            path="*"
            element={
              authRole === "admin" ? <Navigate to="/admin" /> : authRole === "user" ? <Navigate to="/user" /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </DynamicBackground>
    </Router>
  );
};

// ✅ Dynamic Background Component
const DynamicBackground = ({ children }) => {
  const location = useLocation();

  const backgroundImages = {
    "/": "/images/home-bg.jpg",
    "/login": "/images/login-bg.jpg",
    "/admin": "/images/admin-bg.jpg",
    "/admin-panel": "/images/admin-bg.jpg",
    "/user": "/images/user-bg.jpg",
    "/cart": "/images/cart-bg.jpg",
    "/user-orders": "/images/orders-bg.jpg",
    "/about-us": "/images/about-us-bg.jpg",
    "/order-confirmation": "/images/confirmation-bg.jpg",
  };

  // ✅ Handle dynamic paths (e.g., product details page)
  const backgroundImage = location.pathname.startsWith("/product/")
    ? "/images/product-bg.jpg"
    : backgroundImages[location.pathname] || "/images/default-bg.jpg";

  return (
    <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {children}
    </div>
  );
};

export default App;
