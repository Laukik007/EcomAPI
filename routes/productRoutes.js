const express = require("express");
const {
  listProducts,
  getProductById,
  createProduct,
} = require("../controller/productController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// Route to get a list of products
router.route("/").get(protect, listProducts);

// Route to get details of a specific product
router.route("/:id").get(protect, getProductById);

// Route to create a new product
router.route("/create").post(protect, createProduct);

module.exports = router;
