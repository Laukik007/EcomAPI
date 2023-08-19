const jwt = require("jsonwebtoken");
const User = require("../model/userModal");
const asyncHandler = require("express-async-handler");

// Middleware to protect routes requiring authentication
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // Decode the token and retrieve the user's ID
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by ID and exclude the password
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = { protect };
