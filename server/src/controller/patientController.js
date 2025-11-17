const speakeasy = require("speakeasy");
const Patient = require("../models/patientSchema");
const Users = require("../models/userSchema");

//
//patient registration otp validator
const patientOtpValidator = async (req, res) => {
  const { userId } = req.params;
  const { otp } = req.body;
  try {
    if (!userId || !otp) {
      return res.status(400).json({ message: "userid and otp are required" });
    }
    const secret = Buffer.from(userId.toString()).toString("base64");
    const isValid = speakeasy.totp.verify({
      secret: secret,
      encoding: "base64",
      token: otp,
      step: 300, // Must match send step
      window: 0, // No time drift allowed
    });
    // console.log(otp,secret)
    if (!isValid) {
      const del = await Users.findByIdAndDelete(userId);
      return res.status(500).json({
        success: false,
        message: "Invalid or expired OTP and user is deleted",
        del,
      });
    }

    return res
      .status(201)
      .json({ success: true, message: "OTP verified successfully!" });
  } catch (error) {
    console.error("Error otp verification:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
//
// register patient details
const registerPatientDetails = async (req, res) => {
  const {
    userId,
    firstName,
    lastName,
    phone,
    gender,
    age,
    blood_group,
    height,
    weight,
    place,
    emergencyContact,
  } = req.body;

  try {
    const newpatient = await Patient.create({
      userId,
      firstName,
      lastName,
      phone,
      gender,
      age,
      blood_group,
      height,
      weight,
      place,
      emergencyContact: {
        name: emergencyContact.name,
        relation: emergencyContact.relation,
        phone: emergencyContact.phone,
      },
    });
    return res.status(201).json({
      success: true,
      message: "pateint details registered successfully",
      newpatient,
    });
  } catch (error) {
    console.error("Error registering patient:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// updated patient details
const updatePatientDetails = async (userId, otherData) => {
  try {
    const updatingPatient = await Patient.findOneAndUpdate(
      { userId: userId }, // filter
      { $set: otherData }, // update
      { new: true }
    );
    return updatingPatient;
  } catch (error) {
    console.error("Error updating patient in patient collection:", error);
    throw error;
  }
};
//
// delete patient from patient collection
const deletingPatientDetails = async (userId) => {
  try {
    const deletedPatient = await Patient.findOneAndDelete({ userId: userId });

    if (!deletedPatient) {
      return { message: "patient not found" };
    }

    return deletedPatient;
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw error;
  }
};

// show all Patients
const getPatient = async (req, res) => {
  try {
    const patients = await Patient.find();
    return res.status(201).json({
      message: "patient data",
      patients,
    });
  } catch (error) {
    console.error("Error fetching patients:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  patientOtpValidator,
  registerPatientDetails,
  updatePatientDetails,
  deletingPatientDetails,
  getPatient,
};
