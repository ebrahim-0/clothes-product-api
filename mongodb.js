require("dotenv").config();
const connectDB = require("./db"); // Assuming connectDB.js is in the same directory

// Import your product data
const products = require("./database.json"); // Assuming products.json is in the same directory

const Product = require("./models/Product"); // Assuming Product.js is in the same directory

// Connect to MongoDB
connectDB();

// Define your Mongoose schema and model (if you haven't already)

// Add products to MongoDB
const addProductsToDatabase = async () => {
  try {
    // Insert products into your MongoDB collection
    const insertedProducts = await Product.insertMany(products);
    console.log("Products added to MongoDB:", insertedProducts);
  } catch (error) {
    console.log("Error adding products to MongoDB:", error);
  }
};

// Call the function to add products to MongoDB
addProductsToDatabase();
