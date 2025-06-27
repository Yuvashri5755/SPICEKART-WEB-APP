const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const router = express.Router();

// ✅ Add a new product
router.post("/add-product", async (req, res) => {
  try {
    const { name, price, image, available } = req.body;
    if (!name || !price || !image) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const newProduct = new Product({
      name,
      price,
      image,
      available: available ?? true,
    });

    await newProduct.save();
    res.status(201).json({ message: "✅ Product added successfully!", product: newProduct });
  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.status(500).json({ error: "Server error while adding product." });
  }
});

// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ error: "Server error while fetching products." });
  }
});

// ✅ Get a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found!" });
    }

    res.json(product);
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    res.status(500).json({ error: "Server error while fetching product." });
  }
});

// ✅ Update (EDIT) a product by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found!" });
    }

    res.json({ message: "✅ Product updated successfully!", product: updatedProduct });
  } catch (error) {
    console.error("❌ Error updating product:", error);
    res.status(500).json({ error: "Server error while updating product." });
  }
});

// ✅ Delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found!" });
    }

    res.json({ message: "✅ Product deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(500).json({ error: "Server error while deleting product." });
  }
});

module.exports = router;
