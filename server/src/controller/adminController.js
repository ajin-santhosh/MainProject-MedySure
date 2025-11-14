const bcrypt = require("bcrypt");
const Users = require("../models/userSchema");

const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    const existingadmin = await Users.findOne({ email });
    if (existingadmin) {
      return res.status(409).json({ message: "mail id already used" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      email,
      password: hashPassword,
      role: "admin",
    });
    res.status(201).json({
      message: "admin registered successfully",
      user: { email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = createAdmin
