const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },


        // Product snapshot
        name: {
          type: String,
          required: true,
        },


        image: {
          type: String,
        },


        quantity: {
          type: Number,
          required: true,
        },


        price: {
          type: Number,
          required: true,
        },

      },
    ],



    totalAmount: {
      type: Number,
      required: true,
    },



    paymentId: {
      type: String,
      default: "",
    },


    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },


    orderStatus: {
      type: String,
      enum: [
        "Placed",
        "Processing",
        "Shipped",
        "Delivered",
      ],
      default: "Placed",
    },

  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("Order", orderSchema);