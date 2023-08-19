const User = require("../model/userModal");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utilities/generateToken");
const UniversalOrder = require("../model/universalOrderModel");
const Product = require("../model/productModal");
const mongoose = require("mongoose");

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.passwordmatching(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profile_pic: user.profile_pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });
  
  const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(404);
      throw new Error("User already exists");
    }
  
    const user = await User.create({
      name: name,
      email: email,
      password: password,
      profile_pic: pic,
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profile_pic: user.profile_pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });

  const getCartItem=(asyncHandler(async (req, res) => {
    try {
      const cart = await User.findById(req.user._id).populate("cartItems.product");
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred' });
    }
  }));

  const placeOrder = asyncHandler(async (req, res) => {
    try {
        const cartItems = req.user.cartItems; // Get the cartItems array directly
        console.log('cartItems',cartItems);
        const cartItemIds = cartItems.map(item => item.product.toString()); // Extract product IDs
        console.log('cartItemsIds',cartItemIds);
        const userId = req.user._id;
        const { status, iscancelled } = req.body;

        const newOrder = new UniversalOrder({
            status,
            user: userId,
            product: cartItemIds, // Assign the cartItems array directly
            iscancelled,
        });

        const savedOrder = await newOrder.save();

        // Update product availability and user's cartItems
        for (const cartItem of cartItems) {
            try {
                const product = await Product.findById(cartItem.product);
                if (product) {
                    product.availability = Math.max(product.availability - cartItem.qty, 0); // Deduct qty from availability
                    await product.save();
                }
            } catch (error) {
                console.error(`Error updating availability for product ${cartItem.product}:`, error);
            }
        }

        const user = req.user;
        user.cartItems = []; // Clear the cartItems array after placing the order
        user.orders.push(savedOrder._id);
        await user.save();

        res.status(200).json({ message: "Order placed successfully", order: savedOrder });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json("An error occurred while placing the order");
    }
});

const myOrders = asyncHandler(async (req, res) => {
  try {
      const userId = req.user._id;
      const userWithOrders = await User.findById(userId).populate({
          path: 'orders',
          populate: {
              path: 'product', // Update the path to the 'product' field in cartItems
          },
      });

      if (!userWithOrders) {
          return res.status(404).json("User not found");
      }

      res.status(200).json(userWithOrders.orders);
  } catch (error) {
      console.error("Error fetching order history:", error);
      res.status(500).json("An error occurred while fetching order history");
  }
});
  
const removeFromCart = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({ message: 'Invalid product ID' });
      return;
  }

  try {
      const user = req.user;
      const cartItemIndex = user.cartItems.findIndex(item => item.product.equals(productId));

      if (cartItemIndex === -1) {
          res.status(404).json({ message: 'Product not found in cart' });
          return;
      }

      const cartItem = user.cartItems[cartItemIndex];

      if (cartItem.qty > 1) {
          // If the item's quantity is greater than 1, decrement the quantity by 1
          cartItem.qty--;
      } else {
          // If the item's quantity is 1 or less, remove the item from the cart
          user.cartItems.splice(cartItemIndex, 1);
      }

      await user.save();

      res.json({ message: 'Item removed from cart', updatedCart: user.cartItems });
  } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'An error occurred while removing item from cart' });
  }
});

module.exports = { registerUser, authUser,getCartItem,placeOrder,myOrders,removeFromCart};