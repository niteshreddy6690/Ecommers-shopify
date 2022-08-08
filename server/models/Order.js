const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: "string",
      required: true,
    },
    products: [
      {
        productId: { type: "string" },
        quantity: { type: "number", default: 1 },
      },
    ],
    amount: { type: "number", required: true },
    address: { type: Object, required: true },
    status: { type: "string", default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
