const asyncHandler = require("express-async-handler");
const Product = require("../model/productModal");
const mongoose = require('mongoose');

// Controller function to add a product to the user's cart
const addtocart = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const { qty } = req.body; // Get quantity from the request body

    // Check if the provided product ID is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400).json({ message: 'Invalid product ID' });
        return;
    }

    try {
        // Find the product using the provided ID
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        // Check if the product already exists in the cart
        const existingCartItem = req.user.cartItems.find(item => item.product.equals(product._id));

        if (existingCartItem) {
            // Update quantity if the product is in the cart
            existingCartItem.qty += qty;
        } else {
            // Add a new cart item if the product is not in the cart
            req.user.cartItems.push({ qty, product: product._id });
        }

        // Save the user with updated cart items
        await req.user.save();

        res.json({ message: 'Product added to cart' });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = {
    addtocart,
};
