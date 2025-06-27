const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Updated Middleware: Allow All Methods
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000", // Allow frontend access
  methods: "GET, POST, PUT, PATCH, DELETE", // Explicitly allow all methods
  allowedHeaders: "Content-Type, Authorization" // Allow necessary headers
}));

app.use(express.json({ limit: "10mb" })); // Handle large JSON payloads

// ✅ MongoDB Connection
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit on DB failure
  }
};

connectDB();

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const ratingRoutes = require("./routes/ratingRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/ratings", ratingRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the E-Commerce API 🚀");
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ error: err.message || "Something went wrong!" });
});

// ✅ Graceful Shutdown (Handle app termination)
process.on("SIGINT", async () => {
  console.log("🛑 Closing MongoDB connection...");
  await mongoose.connection.close();
  console.log("✅ MongoDB Disconnected. Exiting process...");
  process.exit(0);
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
