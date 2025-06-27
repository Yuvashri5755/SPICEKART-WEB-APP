import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrderConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = localStorage.getItem("latestOrder");

    if (storedOrder) {
      const parsedOrder = JSON.parse(storedOrder);
      setOrderDetails(parsedOrder);

      // ✅ Send order to the backend only if it hasn’t been sent yet
      if (!localStorage.getItem("orderPlaced")) {
        placeOrder(parsedOrder);
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  const placeOrder = async (orderData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/orders", orderData);
      console.log("Order placed successfully:", response.data);
      localStorage.setItem("orderPlaced", "true"); // ✅ Prevent duplicate order submission
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="order-confirm">
      <div className="order-confirmation p-6 text-center">
        {orderDetails ? (
          <>
            <h2 className="text-2xl font-bold">
              <center>🎉 Thank You for Your Order! ✨</center>
            </h2>
            <br />
            <p className="text-lg mt-2">
              <center>✨Your order has been placed successfully 🎉 .</center>
            </p>
            <br />
            <p className="text-lg mt-2">
              <center>✨Your order will be Delivered within one week🎉 .</center>
            </p>
            <br />
            <button
              className="mt-6 bg-black text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-800"
              onClick={() => navigate("/user")}
            >
              🛍 Back to SHOPPING
            </button>
                        {/* Thank You Image */}
                        <center>
              <img
                src="https://www.wordsjustforyou.com/wp-content/uploads/2020/09/Thank-You-Gif-WJ4U-01040920.gif"
                alt="Thank You"
                className="mt-4 rounded-lg"
                style={{ width: "300px", height: "300px", objectFit: "cover" }}
              />
              <br />
            </center>

            <div className="mt-4 text-left border p-4">
              <h3 className="text-xl font-semibold">📝 Order Details:</h3>
              <br />
              <p><strong>Name:</strong> {orderDetails.userName}</p><br />
              <p><strong>Address:</strong> {orderDetails.address}</p><br />
              <p><strong>Phone:</strong> {orderDetails.phone}</p><br />
              <p><strong>Pincode:</strong> {orderDetails.pincode}</p><br />
              <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p><br />
              <p className="text-xl font-bold mt-2">Total Amount: ₹{orderDetails.totalAmount}</p><br />
            </div>

            {/* Ordered Items Table */}
            <div className="order-items-container">
              <h3 className="text-xl font-semibold">🛍 Items Ordered:</h3>
              <table className="order-items-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.items.map((item) => (
                    <tr key={item.id}>
                      <td className="flex items-center">
                        <img src={item.image} alt={item.name} className="order-item-img" 
                             style={{ width: "150px", height: "150px", objectFit: "cover" }} />
                        {item.name}
                      </td>
                      <td>₹{(parseFloat(item.price) || 0).toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>₹{((parseFloat(item.price) || 0) * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p>Loading order details...</p>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;
