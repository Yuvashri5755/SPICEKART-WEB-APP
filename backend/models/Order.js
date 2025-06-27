const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userName: String,
  address: String,
  phone: String,
  pincode: String,
  paymentMethod: String,
  totalAmount: Number,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
});

module.exports = mongoose.model("Order", OrderSchema);
