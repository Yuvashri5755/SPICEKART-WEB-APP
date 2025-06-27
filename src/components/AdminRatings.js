import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminRatings = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch all ratings from the backend
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/ratings/all");
        const data = await response.json();

        if (response.ok) {
          setRatings(data);
        } else {
          console.error("❌ Error fetching ratings:", data.error);
        }
      } catch (error) {
        console.error("❌ Server error while fetching ratings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  return (
    <div className="admin-rating">
    <div className="admin-ratings min-h-screen bg-gray-100 text-black flex flex-col items-center p-6">
     
      <h1 className="text-2xl font-bold mb-4"><center>📢 User Ratings & Reviews</center></h1>

      {/* Back Button */}
      <button
        onClick={() => navigate("/admin")}
        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900 transition mb-4"
      >
        🔙 Back to Admin Dashboard
      </button>
      <br></br>
      {/* Loading State */}
      {loading ? (
        <p className="text-lg text-gray-600">Loading ratings... ⏳</p>
      ) : ratings.length === 0 ? (
        <p className="text-lg text-gray-600">No ratings available.</p>
      ) : (
        <div className="w-full max-w-4xl overflow-x-auto bg-white shadow-md rounded p-4">
          <center>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">User Name</th>
                <th className="border px-4 py-2">Product Name</th>
                <th className="border px-4 py-2">User Rating</th>
                <th className="border px-4 py-2">Review</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((rating, index) => (
                <tr key={index} className="text-center border-b">
                  <td className="border px-4 py-2">{rating.username}</td>
                  <td className="border px-4 py-2 text-blue-500">{rating.productName}</td>
                  <td className="border px-4 py-2 text-yellow-500 text-xl">⭐ {rating.rating}</td>
                  <td className="border px-4 py-2 text-gray-700 italic">"{rating.review}"</td>
                </tr>
              ))}
            </tbody>
          </table>
          </center>
        </div>
      )}
    </div>
    </div>
  );
};

export default AdminRatings;
