const bcrypt = require("bcrypt");
const Users = require("../models/userSchema");

// Create Admin controller
const createAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
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
    return res.status(201).json({
      message: "admin registered successfully",
      user: { email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return res.status(500).json({ message: "Internal Server Error" });
    
  }
};

//Update Admin controller
const updateAdmin = async (req, res) => {
  const { userId } = req.params;
  const { email, password, active } = req.body;
  try {
    const updatingAdmin = await Users.findById(userId);
    if (!updatingAdmin) {
      // const obj =  {
      //   message : "admin not exist in db",
      //   statusCode : 409
      // }
      // return next(obj)
      return res.status(409).json({ message: "admin not exist in db" });
    }

      

    if (email) {
      const existingemail = await Users.findOne({ email, _id: { $ne: userId } });
      if (existingemail) {
        return res.status(409).json({ message: "mail id already in use" });
      }
      updatingAdmin.email = email;
    }
    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      updatingAdmin.password = hashPassword;
    }
    if (active) {
      updatingAdmin.active = active;
    }

    const updatedAdmin = await updatingAdmin.save();
    return res.status(201).json({
      message: "admin updated successfully",
      user: { email: updatedAdmin.email, role: updatedAdmin.role },
    });
  } catch (error) {
    console.error("Error updating admin:", error);
    return res.status(500).json({ message: "Internal Server Error" });
    
  }
};
const getAdmins = async (req, res) => {
  try {
    const getAdmin = await Users.find({ role: "admin" });
    return res.status(201).json({
      message: "admin data",
      getAdmin,
    });
  } catch (error) {
    console.error("Error in getting admin:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteAdmin = async (req,res) => {
    const {userId} = req.params
    try{
        const del = await Users.findByIdAndDelete(userId) 
        return res.status(201).json({
      message: "admin deleted successfully",
      del
    });
         
    }
    catch(error){
           console.error("Error in deleting admin:", error);
    return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { createAdmin, updateAdmin, getAdmins,deleteAdmin };
