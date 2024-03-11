const express = require("express");
const login = require("../controller/login.js");
const createUser = require("../controller/signup.js");
const { authenticate } = require("../middlewares/auth.js");
const {
  addProduct,
  editProduct,
  removeProduct,
  getProducts,
} = require("../controller/product.js");

const router = express.Router();

// Route to get all products

router.get("/products", getProducts);

// Route to add a new product

router.post("/products", authenticate, addProduct);

// Route to edit a product

router.put("/products/:id", authenticate, editProduct);

// Route to remove a product

router.delete("/products/:id", authenticate, removeProduct);

// Route to create a new user
router.post("/register", createUser);

// Route to login
router.post("/login", login);

// Route to logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

router.get("/me", authenticate, (req, res) => {
  res.json({
    message: `Welcome ${req.user.name}`,
    user: {
      name: req.user.name,
      email: req.user.email,
      rule: req.user.rule,
      phoneNumber: req.user.phoneNumber,
    },
    token: res.cookie.token,
  });
});

router.get("/", (req, res) => {
  res.json({
    message: "e-commerce-api",
  });
});

module.exports = router;
