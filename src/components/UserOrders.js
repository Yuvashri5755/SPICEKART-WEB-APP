import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/orders") // Ensure backend is running
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Orders:", data); // ✅ Debugging
        setOrders(data);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);
  

  return (
    <div className="user-order-page">
      <div className="min-h-screen bg-gray-900 text-white p-6">
        {/* Header Section */}
        <header className="flex justify-between items-center p-5 bg-gradient-to-r from-purple-600 to-indigo-500 shadow-lg rounded-md">
          <h1 className="text-3xl font-bold tracking-wider"><center>📜 User Orders </center></h1>
          <div>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 px-6 py-2 mx-2 rounded-full text-white font-semibold hover:bg-blue-600 transition-all duration-300"
            >
              🏠 Home
            </button>
            <button
              onClick={() => navigate("/admin")}
              className="bg-yellow-500 px-6 py-2 rounded-full text-black font-semibold hover:bg-yellow-600 transition-all duration-300"
            >
              🔙 Back to Admin Panel
            </button>
          </div>
        </header>

        {/* Order Table */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg mt-6 overflow-x-auto">
          {orders.length === 0 ? (
            <p className="text-center text-lg font-semibold text-gray-300">
              ❌ No orders have been placed yet.
            </p>
          ) : (
            <table className="w-full border-collapse border border-gray-700 text-center">
              <thead>
                <tr className="bg-gray-700 text-lg text-white">
                  <th className="p-4 border border-gray-600">Order ID</th>
                  <th className="p-4 border border-gray-600">User Name</th>
                  <th className="p-4 border border-gray-600">Address</th>
                  <th className="p-4 border border-gray-600">Phone</th>
                  <th className="p-4 border border-gray-600">Pincode</th>
                  <th className="p-4 border border-gray-600">Total Amount</th>
                  <th className="p-4 border border-gray-600">Items</th>
                  <th className="p-4 border border-gray-600">Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="bg-gray-900 text-white hover:bg-gray-700 transition">
                    <td className="p-4 border border-gray-600 font-mono">{order._id}</td>
                    <td className="p-4 border border-gray-600">{order.userName || "Unknown"}</td>
                    <td className="p-4 border border-gray-600">{order.address || "Not Provided"}</td>
                    <td className="p-4 border border-gray-600">{order.phone || "N/A"}</td>
                    <td className="p-4 border border-gray-600">{order.pincode || "N/A"}</td>
                    <td className="p-4 border border-gray-600 font-bold text-green-400">₹{order.totalAmount || 0}</td>
                    <td className="p-4 border border-gray-600 text-left">
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item, index) => (
                          <span key={index} className="block">
                            {item.name} ({item.quantity || 1}x)
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400">No items</span>
                      )}
                    </td>
                    <td className="p-4 border border-gray-600">{order.paymentMethod || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
