const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Define the schema for products
const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    availability: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// Create the Product model using the productSchema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
