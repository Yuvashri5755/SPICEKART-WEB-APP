import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import RatingComponent from "./RatingComponent";

const ProductDetails = ({ products, cart, setCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate(); // ✅ Navigation hook for redirection

  const product = products.find((p) => p._id === productId); // ✅ Use `_id` for consistency

  if (!product) {
    return <h2 className="text-center text-red-500 text-xl font-bold">Product not found!</h2>;
  }

  const handleAddToCart = () => {
    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      setCart(cart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    alert(`✅ ${product.name} added to cart.`);
  };

  return (
    <div className="product min-h-screen bg-gradient-to-b from-purple-600 to-pink-400 p-6">
      <button
        onClick={() => navigate("/userdashboard")} // ✅ Redirect to User Dashboard
        className="bg-gray-700 text-white px-5 py-2 rounded-full hover:bg-gray-900 transition-all duration-300 font-semibold"
      >
        ⬅️ Back to Shop
      </button>

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <div className="flex flex-col items-center">
          {/* Product Image */}
          <center>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-80 h-80 object-cover rounded-lg"
            style={{ width: "240px", height: "240px", objectFit: "cover" }} 
          />

          {/* Product Details */}
          <h1 className="text-3xl font-bold mt-4">{product.name}</h1><br></br>
          <h2 className="text-gray-600 text-lg mt-2">Price: ₹{product.price}</h2>
          <br></br>
          <p className="text-center text-gray-700 mt-4">
            Spices and nuts are nature’s treasure troves of flavor and nutrition, enriching cuisines worldwide.
          </p><br></br>
          <p className="text-center text-gray-700 mt-2">
            From enhancing taste and aroma to boosting immunity and digestion, they play a vital role in every cuisine.
          </p>
          <br></br>
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-6 bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition-all duration-300 font-semibold"
          >
            🛒 Add to Cart
          </button>
          </center>
          {/* Rating and Reviews */}
          <div className="mt-6">
            <RatingComponent productId={product._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
