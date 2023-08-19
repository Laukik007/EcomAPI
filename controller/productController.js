const asyncHandler = require("express-async-handler");
const Product = require("../model/productModal");

// Get a list of all products
const listProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Get a product by its ID
const getProductById = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
});

// Create a new product
const createProduct = asyncHandler(async (req, res) => {
    const { title, price, description, availability, category } = req.body;

    // Validate required fields
    if (!title || !price || !description || !availability || !category) {
        res.status(400);
        throw new Error("Please fill all the fields");
    } else {
        const newProduct = new Product({
            title,
            price,
            description,
            availability,
            category
        });
        const createdProduct = await newProduct.save();
        res.status(201).json(createdProduct);
    }
});

module.exports = {
    listProducts,
    getProductById,
    createProduct,
};
