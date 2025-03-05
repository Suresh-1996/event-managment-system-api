const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

exports.protect = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id);
    if (!req.admin) throw new Error();
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized" });
  }
};
