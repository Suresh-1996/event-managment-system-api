const jwt = require("jsonwebtoken");
const user = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const cleanToken = token.replace("Bearer ", "");
    const decoded = await jwt.verify(cleanToken, process.env.JWT_SECRET);

    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
