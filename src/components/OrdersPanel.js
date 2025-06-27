import React from "react";

const OrdersPanel = ({ orders }) => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded shadow-lg">
      <h3 className="text-2xl font-bold text-green-400 mb-4">📜 User Orders</h3>

      {orders.length === 0 ? (
        <p className="text-center">No orders placed yet.</p>
      ) : (
        <table className="w-full border-collapse border-gray-700">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-3">Order ID</th>
              <th className="p-3">User Name</th>
              <th className="p-3">Address</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Total Amount</th>
              <th className="p-3">Items</th>
              <th className="p-3">Payment Method</th> {/* Added Payment Method column */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-700">
                {/* Check if order.id exists, otherwise display "N/A" */}
                <td className="p-3">{order.id || "N/A"}</td>

                {/* Display user name */}
                <td className="p-3">{order.userName}</td>

                {/* Display address */}
                <td className="p-3">{order.address}</td>

                {/* Display phone number */}
                <td className="p-3">{order.phone}</td>

                {/* Display total amount */}
                <td className="p-3 font-bold text-green-400">
                  ₹{order.totalAmount || "0"}
                </td>

                {/* Check if items exist and display them */}
                <td className="p-3">
                  {Array.isArray(order.items) && order.items.length > 0
                    ? order.items
                        .map((item) => `${item.name} (${item.quantity}x)`)
                        .join(", ")
                    : "No items"}
                </td>

                {/* Display payment method */}
                <td className="p-3">{order.paymentMethod || "Not Specified"}</td> {/* Display payment method */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersPanel;
