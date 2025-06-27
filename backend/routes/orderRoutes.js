const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Save Order to Database
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

// Get all orders (Admin only)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
