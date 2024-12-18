const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Giải mã token
    req.user = { _id: decoded.userId }; // Gắn userId vào req
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
module.exports = authMiddleware;
