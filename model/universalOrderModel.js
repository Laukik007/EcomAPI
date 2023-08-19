const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Define the schema for universal orders
const UniversalOrderModel = mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the User model
      required: true,
    },
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
      },
    ],
    iscancelled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create the UniversalOrder model using the UniversalOrderModel schema
const UniversalOrder = mongoose.model("uniorder", UniversalOrderModel);

module.exports = UniversalOrder;
