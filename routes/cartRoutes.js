const express = require("express");
const { addtocart } = require("../controller/cartController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// Route to add a product to the user's cart
router.route("/:id").post(protect, addtocart);

module.exports = router;
