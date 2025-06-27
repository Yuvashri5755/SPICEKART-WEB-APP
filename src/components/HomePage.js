import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Home = () => {
  return (
    <div className="home-page flex flex-col items-center justify-center min-h-screen relative">
      {/* Center Content */}
      <div className="home-content text-center text-white">
        <h1 className="text-4xl font-bold mb-4">🥜 WELCOME TO SPICES & NUTS SHOPPING PAGE  🌶️</h1><br />
        <h2 className="text-4xl font-bold mb-4">Explore the finest selection of spices and nuts.</h2><br />
        <h3 className="text-xl mb-6">     🌶️ Experience the art of fine flavors. From the warmth of spices to the crunch of nuts, each ingredient is a masterpiece of nature’s goodness.🍂🥜</h3><br />
        <h3 className="text-xl mb-6">✨"Spices tell stories, and nuts hold nature’s richness. 🌶️🥜 Elevate your taste with the finest flavors, crafted for true food lovers." ✨</h3>

        {/* Buttons (Below Text) */}
        <div className="flex gap-4">
          <br />
          <Link to="/about-us">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
              About Us
            </button>
          </Link>
          <br />
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
