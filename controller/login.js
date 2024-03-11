const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json({ message: "All input is required" });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "Invalid Credentials" });
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    return res.status(404).json({ message: "Invalid Credentials" });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      name: user.name,
      email: user.email,
      rule: user.rule,
    },
    process.env.SECRET_KEY,
    { expiresIn: process.env.TOKEN_EXPIRY }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.json({
    message: "User Login Successfully",
    user: {
      name: user.name,
      email: user.email,
      rule: user.rule,
    },
    token,
  });
};

module.exports = login;
