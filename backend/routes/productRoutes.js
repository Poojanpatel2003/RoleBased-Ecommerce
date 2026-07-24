const express = require("express");

const router = express.Router();

const { createProduct,getAllProducts,getSingleProduct,updateProduct,deleteProduct } = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");
router.get(
  "/",
  getAllProducts,
);
// Public - Get Single Product
router.get(
  "/:id",
  getSingleProduct
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin","sales"),
  updateProduct
);
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin","sales"),
  deleteProduct
);
// Admin & Sales can create products
router.post(
  "/",
  protect,
  authorizeRoles("admin", "sales"),
  upload.single("image"),
  createProduct
);

module.exports = router;