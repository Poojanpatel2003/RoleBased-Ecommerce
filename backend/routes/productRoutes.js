const express = require("express");

const router = express.Router();

const { createProduct } = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Admin & Sales can create products
router.post(
  "/",
  protect,
  authorizeRoles("admin", "sales"),
  upload.single("image"),
  createProduct
);

module.exports = router;