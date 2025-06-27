const express = require("express");
const Rating = require("../models/Rating");
const router = express.Router();

// ✅ POST: Add a new rating
router.post("/rate-product", async (req, res) => {
  try {
    console.log("📥 Received Rating Request:", req.body);

    const { username, productName, rating, review } = req.body;

    if (!username || !productName || rating === undefined || rating === null) {
      console.log("❌ Missing required fields:", { username, productName, rating, review });
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save the rating
    const newRating = new Rating({
      username, 
      productName,
      rating: Number(rating),
      review,
    });

    await newRating.save();

    console.log("✅ Rating saved successfully!", newRating);
    res.status(201).json({ message: "✅ Rating submitted successfully!", newRating });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// ✅ GET: Fetch all ratings
router.get("/all", async (req, res) => {
  try {
    const ratings = await Rating.find().sort({ createdAt: -1 });
    res.status(200).json(ratings);
  } catch (error) {
    console.error("❌ Error fetching ratings:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
