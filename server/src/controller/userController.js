const bcrypt = require("bcrypt");
const Users = require("../models/userSchema");
const {
  registerDoctor,
  updateDoctordetails,
  deletingDoctorDetails,
} = require("./doctorController");
const {
  patientSignInMailVerfication,
} = require("../controller/mailController");
const {
  updatePatientDetails,
  deletingPatientDetails,
} = require("../controller/patientController");

// create docter
const createDoctor = async (req, res) => {
  const { email, password,active, ...otherData } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success:false, message: "email and password are required" });
    }
    const existingemail = await Users.findOne({ email });
    if (existingemail) {
      return res.status(409).json({ success:false, message: "mail id already used" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      email,
      password: hashPassword,
      role: "doctor",
      active,
    });
    const userId = newUser._id;
    const newrDoctor = await registerDoctor(otherData, userId); // passing data to doctor controller
    return res.status(201).json({
      success:true,
      message: "docter registered successfully",
      user: newUser,
      doctor: newrDoctor,
    });
  } catch (error) {
    console.error("Error creating doctor:", error);
    return res.status(500).json({ success:false, message: "Internal Server Error" });
  }
};

//update doctor
const updateDoctor = async (req, res) => {
  const { userId } = req.params;
  const { email, password, active, ...otherData } = req.body;
  try {
    const updatingDoctor = await Users.findById(userId);
    if (!updatingDoctor) {
      return res.status(409).json({ success:false, message: "doctor not exist in db" });
    }
    if (email) {
      const existingemail = await Users.findOne({
        email,
        _id: { $ne: userId },
      });
      if (existingemail) {
        return res.status(409).json({ success:false, message: "mail id already in use" });
      }
      updatingDoctor.email = email;
    }
    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      updatingDoctor.password = hashPassword;
    }
    
    updatingDoctor.active = active;
    
    const updatedDoctor = await updatingDoctor.save();
    if (Object.keys(otherData).length > 0) {
      await updateDoctordetails(userId, otherData);
    }
    return res.status(201).json({
      success:true,
      message: "doctor updated successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    console.error("Error updating doctor:", error);
    return res.status(500).json({ success:false, message: "Internal Server Error" });
  }
};

// Deleting doctor
const deleteDoctor = async (req, res) => {
  const { userId } = req.params;
  try {
    const del = await Users.findByIdAndDelete(userId);
    const deletedDoctorDetails = await deletingDoctorDetails(userId);

    return res.status(201).json({
      success:true,
      message: "doctor deleted successfully",
      del,
      deletedDoctorDetails,
    });
  } catch (error) {
    console.error("Error in deleting doctor:", error);
    return res.status(500).json({ success:false, message: "Internal Server Error" });
  }
};
//
// create patient in User

const createPatient = async (req, res) => {
  const { email, password,active} = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success:false, message: "email and password are required" });
    }
    const existingemail = await Users.findOne({ email });
    if (existingemail) {
      return res.status(409).json({ success:false, message: "mail id already used" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      email,
      password: hashPassword,
      role: "patient",
      active,
    });
    const userId = newUser._id;
    const mailsender = await patientSignInMailVerfication(userId,email); // mail sender
    if (mailsender !== true) {
      return res.status(500).json({ success:false, message: "error in sending mail" });
    }
    return res.status(201).json({
      success:true,
      message: "patient registered successfully",
      data: userId
    });
  } catch (error) {
    console.error("Error creating patient:", error);
    return res.status(500).json({ success:false, message: "Internal Server Error" });
  }
};

//Update Patient
const updatePatient = async (req, res) => {
  const { userId } = req.params;
  const { email, password, active, ...otherData } = req.body;
  try {
    const updatingPatient = await Users.findById(userId);
    if (!updatingPatient) {
      return res.status(409).json({ success:false, message: "patient not exist in db" });
    }
    if (email) {
      const existingemail = await Users.findOne({
        email,
        _id: { $ne: userId },
      });
      if (existingemail) {
        return res.status(409).json({ success:false, message: "mail id already in use" });
      }
      updatingPatient.email = email;
    }
    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      updatingPatient.password = hashPassword;
    }
    
      updatingPatient.active = active;
    
    const updatedPatient = await updatingPatient.save();
    if (Object.keys(otherData).length > 0) {
      await updatePatientDetails(userId, otherData);
    }
    return res.status(201).json({
      success:true,
      message: "patient updated successfully",
      user: updatedPatient,
    });
  } catch (error) {
    console.error("Error updating patient:", error);
    return res.status(500).json({ success:false, message: "Internal Server Error" });
  }
};
// Deleting Patient
const deletePatient = async (req, res) => {
  const { userId } = req.params;
  try {
    const del = await Users.findByIdAndDelete(userId);
    const deletedPatientDetails = await deletingPatientDetails(userId);

    return res.status(201).json({
      success:true,
      message: "patient deleted successfully",
      del,
      deletedPatientDetails,
    });
  } catch (error) {
    console.error("Error in deleting patient:", error);
    return res.status(500).json({ success:false, message: "Internal Server Error" });
  }
};
module.exports = {
  createDoctor,
  updateDoctor,
  deleteDoctor,
  createPatient,
  updatePatient,
  deletePatient,
};
