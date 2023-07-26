const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.authHeaders.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new Error("Invalid token format");
    }

    const token = authHeader.split(" ")(1);

    if (!token) {
      throw new Error("No token provided");
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(id);

    next();
  } catch (error) {
    if (error.name === "jsonWebTokenError") {
      req.status(401).json({ error: "Invalid token" });
    } else {
      req.status(403).json({ error: "Unauthorized access." });
    }
  }
};

module.exports = { isAuthenticated };
