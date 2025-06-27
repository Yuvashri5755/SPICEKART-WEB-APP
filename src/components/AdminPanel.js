import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "", available: true });
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch Products from Backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        alert("❌ Failed to load products.");
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // ✅ Handle Input Change
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // ✅ Add Product
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("❗ Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/products/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();
      if (response.ok) {
        setProducts([...products, data.product]); // ✅ Update UI without reload
        setNewProduct({ name: "", price: "", image: "", available: true });
        alert("✅ Product added successfully!");
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert("❌ Server error. Try again.");
    }
  };

  // ✅ Edit Product (set product for editing)
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({ name: product.name, price: product.price, image: product.image, available: product.available });
  };

  // ✅ Save Updated Product
  const updateProduct = async (_id, updatedData) => {
    if (!_id) {
      alert("Error: Product ID is missing!");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/products/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error");
      }
  
      alert("✅ Product updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("❌ Error updating product:", error);
      alert("❌ Server error. Try again.");
    }
  };
  
  // ✅ Delete Product
  const deleteProduct = async (_id) => {
    if (!_id) {
      alert("Error: Product ID is missing!");
      return;
    }
  
    if (!window.confirm("🗑️ Are you sure you want to delete this product?")) return;
  
    try {
      const response = await fetch(`http://localhost:5000/api/products/${_id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error");
      }
  
      alert("✅ Product deleted successfully!");
      setProducts(products.filter((product) => product._id !== _id));
    } catch (error) {
      console.error("❌ Error deleting product:", error);
      alert("❌ Server error. Try again.");
    }
  };
  
  // ✅ Toggle Product Availability
  const toggleAvailability = async (id, currentAvailability) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ available: !currentAvailability }),
      });

      const data = await response.json();
      if (response.ok) {
        setProducts(products.map((prod) => (prod._id === id ? { ...prod, available: !currentAvailability } : prod)));
      } else {
        alert("❌ Error updating availability: " + data.error);
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Server error. Try again.");
    }
  };

  return (
    <div className="admin-panel min-h-screen bg-gray-100 text-black flex flex-col justify-center items-center">
      <div className="p-6 w-full max-w-4xl">
        <center>
          <h1 className="text-2xl font-bold text-center">📦 Admin Panel - Product Management</h1>
        </center>
        {/* Back Button */}
        <button onClick={() => navigate("/admin")} className="bg-gray-700 text-white px-4 py-2 rounded mt-4 hover:bg-gray-800 transition">
          🔙 Back to Admin Home
        </button>

        {/* Loading Indicator */}
        {loading && <p className="text-center mt-4 text-gray-700">Loading products... ⏳</p>}

        {/* Product Form */}
        <div className="mt-4 p-4 bg-white shadow-md rounded">
          <center>
            <h2 className="text-lg font-semibold mb-2">{editingProduct ? "✏️ Edit Product" : "➕ Add New Product"}</h2>
          </center>
          <label>Product Name:</label>
          <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} className="border p-2 rounded w-full mb-2" /><br></br>
          <label>Product Price:</label>
          <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} className="border p-2 rounded w-full mb-2" /><br></br>
          <label>Product Image:</label>
          <input type="text" name="image" value={newProduct.image} onChange={handleInputChange} className="border p-2 rounded w-full mb-2" /><br></br>

          {editingProduct ? (
            <button onClick={() => updateProduct(editingProduct._id, newProduct)} className="bg-blue-500 text-white px-4 py-2 rounded w-full">Save Changes</button>
          ) : (
            <button onClick={handleAddProduct} className="bg-green-500 text-white px-4 py-2 rounded w-full">Add Product</button>
          )}
        </div>
        <center>
        {/* Product List */}
        <h2 className="text-lg font-bold mt-6 text-center">📋 Product List</h2> </center>
        <ul className="grid grid-cols-3 gap-4 mt-4">
          {products.map((product) => (
            <li key={product._id} className="border p-4 bg-white shadow-md rounded">
              <img src={product.image} alt={product.name} className="w-32 h-32 object-cover mb-2"  style={{ width: "140px", height: "140px", objectFit: "cover" }}/>
              <h4>{product.name}</h4>
              <p>₹{product.price}</p>
              <button onClick={() => handleEditProduct(product)} className="bg-yellow-500 px-2 py-1 rounded mt-2">Edit</button>
              <button onClick={() => deleteProduct(product._id)} className="bg-red-500 px-2 py-1 rounded mt-2">Delete</button>
              <button onClick={() => toggleAvailability(product._id, product.available)} className={`px-2 py-1 rounded mt-2 ${product.available ? "bg-green-500" : "bg-gray-500"}`}>
                {product.available ? "Available" : "Unavailable"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
