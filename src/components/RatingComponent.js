import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Rating from "react-rating-stars-component";

const RatingComponent = () => {
  const [ratings, setRatings] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [review, setReview] = useState("");
  const [username, setUsername] = useState(""); 
  const [productName, setProductName] = useState("");

  // Fetch ratings from API
  const fetchRatings = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/ratings/all");
      setRatings(response.data);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  }, []);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  // Handle rating submission
  const submitRating = async () => {
    if (userRating === 0 || review.trim() === "" || username.trim() === "" || productName.trim() === "") {
      alert("❗ Please fill in all fields.");
      return;
    }

    console.log("📤 Sending Rating Data:", {
      username,
      productName,
      rating: userRating,
      review,
    });

    try {
      const response = await axios.post("http://localhost:5000/api/ratings/rate-product", {
        username,
        productName,
        rating: userRating,
        review,
      });

      console.log("✅ Response from backend:", response.data);
      alert("✅ Rating submitted!");
      fetchRatings(); 
      setUserRating(0);
      setReview("");
      setUsername("");
      setProductName("");
    } catch (error) {
      console.error("❌ Error submitting rating:", error.response?.data || error.message);
      alert("❌ Failed to submit rating: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="rating-section p-4 border rounded">
      <h3 className="text-lg font-bold">⭐ Product Ratings</h3><br />
      {ratings.length > 0 ? (
        <ul>
          <center>
            {ratings.map((rate) => (
              <li key={rate._id} className="border-b p-2">
                <strong>{rate.username || "Anonymous"}</strong> reviewed <strong>{rate.productName}</strong>: {rate.rating} ⭐ - {rate.review}
              </li>
            ))}
          </center>
        </ul>
      ) : (
        <p>No ratings yet. Be the first to review! 😊</p>
      )}<br />

      <div className="mt-4">
        <h3 className="text-md font-semibold"><b>Rate this product:</b></h3><br />

        <label className="font-medium">👤 Username:</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full mt-2"
        />
        <br></br>
        <label className="font-medium">📦 Product Name:</label>
        <input
          type="text"
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border p-2 rounded w-full mt-2"
        />
        <br></br>
        <label className="font-medium">⭐ Rating:</label>
        <Rating
          count={5}
          value={userRating}
          size={30}
          onChange={(newRating) => setUserRating(newRating)}
        />
        <br></br>
        <label className="font-medium">💬 Review:</label>
        <input
          type="text"
          placeholder="Write a review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="border p-2 rounded w-full mt-2"
        />

        <button
          onClick={submitRating}
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600 transition"
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default RatingComponent;
