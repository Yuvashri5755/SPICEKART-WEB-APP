const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    productName: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", RatingSchema);
