const express = require("express");

const router = express.Router();

const {
  createOrder,
  getMyOrders,
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");


// Create Order
router.post(
  "/",
  protect,
  createOrder
);


// My Orders
router.get(
  "/my-orders",
  protect,
  getMyOrders
);


module.exports = router;