const express = require("express");
const { 
    registerUser, 
    authUser, 
    getCartItem, 
    placeOrder, 
    myOrders, 
    removeFromCart 
} = require("../controller/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Route to register a new user
router.route("/").post(registerUser);

// Route to remove an item from the user's cart
router.delete("/:id", protect, removeFromCart);

// Route to log in a user
router.route("/login").post(authUser);

// Route to get the user's cart items
router.get('/cart-item', protect, getCartItem);

// Route to get the user's order history
router.get('/order-history', protect, myOrders);

// Route to place an order
router.post('/place-order', protect, placeOrder);

module.exports = router;
