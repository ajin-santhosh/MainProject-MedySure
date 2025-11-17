const { verifyAccessToken } = require('../utils/jwt')
const COOKIE_NAME = process.env.ACCESS_COOKIE_NAME || "access_token";

module.exports = (req, res, next) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = verifyAccessToken(token);

    req.user = decoded; // { id, role }
    next();

  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}