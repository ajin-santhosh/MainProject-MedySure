const Doctor = require("../models/docterSchema");

// create doctor

const registerDoctor = async (otherData, userId) => {
  try {
    const newDoctor = await Doctor.create({
      userId,
      ...otherData,
    });
    return newDoctor;
  } catch (error) {
    console.error("Error creating doctor in doctor collection:", error);
    throw error;
  }
};
//
// updated docter collection
const updateDoctordetails = async (userId, otherData) => {
  try {
    const updatingdoctor2 = await Doctor.findOneAndUpdate(
      { userId: userId }, // filter
      { $set: otherData }, // update
      { new: true }
    );
    return updatingdoctor2;
  } catch (error) {
    console.error("Error updating doctor in doctor collection:", error);
    throw error;
  }
};
//
// delete dcotor from doctor collection
const deletingDoctorDetails = async (userId) => {
  try {
    const deletedDoctor = await Doctor.findOneAndDelete({ userId: userId });

    if (!deletedDoctor) {
      return { message: "Doctor not found" };
    }

    return deletedDoctor;
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw error;
  }
};
//
// show all doctrors
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    return res.status(201).json({
      message: "doctor data",
      doctors,
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerDoctor, updateDoctordetails, deletingDoctorDetails,getDoctors };
