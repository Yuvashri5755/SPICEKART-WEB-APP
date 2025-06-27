import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 text-black flex flex-col justify-center items-center">
      <center>
        <h1 className="text-black">🛠️ Admin Dashboard</h1>
        <br />

        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem("authRole");
            navigate("/");
            onLogout();
          }}
          className="bg-red-600 px-6 py-2 rounded-full text-white font-bold hover:bg-red-700 transition-all duration-300 shadow-md"
        >
          🚪 Logout
        </button>
        <br />

        {/* Buttons Section */}
        <div className="flex flex-col gap-6 mt-12">
          <br />
          <center>
            {/* Product Management */}
            <button
              onClick={() => navigate("/admin-panel")}
              className="bg-green-600 px-6 py-3 rounded-full text-white font-bold hover:bg-green-700 transition-all duration-300 shadow-lg text-lg"
            >
              📦 Product Management
            </button>
          </center>
          <br />

          {/* User Orders */}
          <center>
            <button
              onClick={() => navigate("/user-orders")}
              className="bg-yellow-500 px-6 py-3 rounded-full text-white font-bold hover:bg-yellow-600 transition-all duration-300 shadow-lg text-lg"
            >
              📜 User Orders
            </button>
          </center>
          <br />

          {/* ✅ New: User Ratings Button */}
          <center>
            <button
              onClick={() => navigate("/admin-ratings")}
              className="bg-blue-500 px-6 py-3 rounded-full text-white font-bold hover:bg-blue-600 transition-all duration-300 shadow-lg text-lg"
            >
              ⭐ User Ratings
            </button>
          </center>
        </div>
      </center>
    </div>
  );
};

export default AdminDashboard;
