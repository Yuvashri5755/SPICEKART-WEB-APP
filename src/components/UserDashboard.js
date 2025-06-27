import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const UserDashboard = ({ products, cart, setCart, onLogout, userId }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Function to add a product to the cart
  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
  
    if (existingProduct) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  
    alert(`${product.name} added to cart.`);
  };
  
  // Function to handle logout
  const handleLogout = () => {
    onLogout(); 
    navigate("/"); 
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-dashboard">
      <div className="min-h-screen bg-gradient-to-b from-purple-600 to-pink-400 p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold tracking-wider text-center">✨ Welcome To User Dashboard ✨</h1>
        <br />

        <button
          onClick={handleLogout}
          className="bg-red-500 px-5 py-2 rounded-full text-white font-semibold hover:bg-red-600 transition-all duration-300"
        >
          Logout
        </button>
        <br />
  
        {/* Go to Cart Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate("/cart")}
            className="absolute top-5 right-5 bg-green-500 text-black px-6 py-3 rounded-full text-lg font-bold shadow-md hover:bg-green-600 transition-all duration-300"
          >
            🛒 Go to Cart
          </button>
        </div>
        <br />

        {/* Product List */}
        <div className="available">
          <div className="p-6">
            <h2 className="text-3xl font-bold text-center text-black mb-6">🛍️ Available Products</h2>
            <br />
             {/* Search Bar */}
            <div className="available-search">
              <div className="flex justify-center mt-4"><br></br>
                <input
                  type="text"
                  placeholder="🔍 Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 rounded-full border text-black w-1/2 shadow-md focus:outline-none"
                />
              </div>
            </div>
            <br />
            {/* Grid Layout Matching Admin Panel */}
            <ul className="grid grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <li key={product.id} className="border rounded p-4 bg-white shadow-lg">
                   <Link to={`/product/${product._id}`}>
                    <img
                       src={product.image}
                       alt={product.name}
                       className="mb-2 cursor-pointer hover:scale-105 transition-transform"
                      style={{ width: "140px", height: "140px", objectFit: "cover" }}
                      />
                   </Link>
                  <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-lg font-semibold">Price: ₹{product.price}</p>
                  
                 

                  {product.available === false ? (
                    <p className="text-red-500 font-bold text-lg mt-2">🚫 Out of Stock</p>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-blue-500 text-white px-5 py-2 rounded-full mt-4 hover:bg-blue-600 transition-all duration-300 font-semibold"
                    >
                      ➕ Add to Cart
                    </button>
                  )}  
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
