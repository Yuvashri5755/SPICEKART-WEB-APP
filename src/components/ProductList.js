import React, { useEffect, useState } from "react";
import "../index.css"; // Ensure this file is imported

const ProductList = ({ isAdmin, onEdit, onDelete }) => {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="product-row">
  {products.map((product) => (
    <div key={product.id} className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">₹{product.price}</p>
      {isAdmin && (
        <div className="admin-buttons">
          <button onClick={() => onEdit(product)} className="edit-btn">Edit</button>
          <button onClick={() => onDelete(product.id)} className="delete-btn">Delete</button>
        </div>
      )}
    </div>
  ))}
</div>

  );
};

export default ProductList;
