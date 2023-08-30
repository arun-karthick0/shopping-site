const mongoose = require("mongoose");

const checkoutSessionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  productName: String,
  productQty: Number,
  totalPrice: Number,
  timestamp: { type: Date, default: Date.now },
  paymentMode: String,
});

const CheckoutSession = mongoose.model(
  "CheckoutSession",
  checkoutSessionSchema
);

module.exports = CheckoutSession;
