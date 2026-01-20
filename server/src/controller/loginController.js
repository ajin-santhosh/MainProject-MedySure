const bcrypt = require("bcrypt")
const Users = require("../models/userSchema");
const { createAccessToken } = require('../utils/jwt')
const COOKIE_NAME = process.env.ACCESS_COOKIE_NAME

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 5 * 60 * 60 * 1000  // 5 hours
};
const userLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    if (!user.active) {
      return res.status(401).json({ success: false, message: "your User acount is now deactivated please contact the administration" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }


    const token = createAccessToken({
      id: user._id.toString(),
      role: user.role
    });

    res.cookie(COOKIE_NAME, token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: { id: user._id, email: user.email, role: user.role }
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}
const userLogout = async (req, res) => {
  res.clearCookie(COOKIE_NAME, cookieOptions);
  return res.status(200).json({ success: true, message: "Logged out" });
};
module.exports = { userLogin, userLogout }