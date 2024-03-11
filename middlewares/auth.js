const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User associated with the token not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    // Provide more detailed error messages based on the specific error
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      // Handle other types of errors
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = { authenticate };
