const express = require("express");
const userRoutes = require("./routes/userRoutes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const cartRoutes=require("./routes/cartRoutes")

const app = express();

app.use(express.json());
app.use("/api/product", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart",cartRoutes)

dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("api is running");
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`server started on port ${PORT}`));