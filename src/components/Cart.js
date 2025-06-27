import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Cart = ({ cart, setCart }) => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    address: "",
    phone: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  const handleQuantityChange = (_id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === _id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };
  
  const handleRemoveItem = (_id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== _id));
  };
  

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    const { userName, address, phone, pincode } = userInfo;
  
    if (!userName || !address || !phone || !pincode || cart.length === 0) {
      alert("⚠️ Please fill in all details and add items to the cart.");
      return;
    }
  
    const totalAmount = cart.reduce(
      (acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity,
      0
    );
  
    const newOrder = {
      userName,
      address,
      phone,
      pincode,
      totalAmount: totalAmount.toFixed(2),
      items: cart,
      paymentMethod,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
  
      if (!response.ok) throw new Error("Failed to place order");
  
      const data = await response.json();
      alert(data.message || "✅ Order placed successfully!");
  
      // ✅ Store the order in localStorage before navigating
      localStorage.setItem("latestOrder", JSON.stringify(newOrder));
  
      setCart([]); // Clear cart after order placement
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Order Error:", error);
      alert("❌ Failed to place order. Please try again.");
    }
  };
  

  const totalAmount = cart.reduce(
    (acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <div className="cart-container p-6">
        <h2 className="text-2xl font-bold mb-4">🛒 Your Cart ({cart.length} items)</h2>

        {cart.length === 0 ? (
          <p className="text-lg text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Item</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Quantity</th>
                  <th className="p-2 border">Total</th>
                  <th className="p-2 border">Remove</th>
                </tr>
              </thead>
              <tbody>
              {cart.map((item) => (
                     <tr key={item._id} className="text-center border">

                    <td className="p-2 border flex items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
                      {item.name}
                    </td>
                    <td className="p-2 border">₹{(parseFloat(item.price) || 0).toFixed(2)}</td>
                    <td className="p-2 border">
                      <button
                        className="px-2 py-1 border bg-gray-200"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="px-2 py-1 border bg-gray-200"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </td>
                    <td className="p-2 border">₹{((parseFloat(item.price) || 0) * item.quantity).toFixed(2)}</td>
                    <td className="p-2 border">
                    <button className="text-red-500" onClick={() => handleRemoveItem(item._id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">📌 Enter Your Details</h3>
              <input type="text" name="userName" placeholder="Full Name" value={userInfo.userName} onChange={handleChange} className="block w-full p-2 mb-2 border rounded" />
              <input type="text" name="address" placeholder="Address" value={userInfo.address} onChange={handleChange} className="block w-full p-2 mb-2 border rounded" />
              <input type="text" name="phone" placeholder="Phone Number" value={userInfo.phone} onChange={handleChange} className="block w-full p-2 mb-4 border rounded" />
              <input type="text" name="pincode" placeholder="Pincode" value={userInfo.pincode} onChange={handleChange} className="block w-full p-2 mb-4 border rounded" />
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">💳 Select Payment Method</h3>
              <label className="block">
                <input type="radio" value="COD" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} /> Cash on Delivery
              </label>
              <label className="block">
                <input type="radio" value="UPI" checked={paymentMethod === "UPI"} onChange={() => setPaymentMethod("UPI")} /> Scan UPI QR Code
              </label>
            </div>

            <div className="mt-6 text-right">
              <p className="text-lg">Subtotal: ₹{totalAmount.toFixed(2)}</p>
              <button className="bg-black text-white px-6 py-2 mt-4 rounded" onClick={handleOrder}>✅ Place Order</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
