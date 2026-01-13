const speakeasy = require("speakeasy");
const Patient = require("../models/patientSchema");
const Users = require("../models/userSchema");
const mongoose = require("mongoose");

//
//patient registration otp validator
const patientOtpValidator = async (req, res) => {
  const { userId } = req.params;
  const { otp } = req.body;
  try {
    if (!userId || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "userid and otp are required" });
    }
    const secret = Buffer.from(userId.toString()).toString("base64");
    const isValid = speakeasy.totp.verify({
      secret: secret,
      encoding: "base64",
      token: otp,
      step: 300, // Must match send step
      window: 0, // No time drift allowed
    });
    console.log(otp, secret);
    if (!isValid) {
      // const del = await Users.findByIdAndDelete(userId);
      return res.status(500).json({
        success: false,
        message: "Invalid or expired OTP and ",
        // data:del,
      });
    }

    return res
      .status(201)
      .json({ success: true, message: "OTP verified successfully!" });
  } catch (error) {
    console.error("Error otp verification:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
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
      data: newpatient,
    });
  } catch (error) {
    console.error("Error registering patient:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
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
    const patients = await Patient.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 1,
          userId: 1,
          firstName: 1,
          lastName: 1,
          gender: 1,
          phone: 1,
          age: 1,
          blood_group: 1,
          height: 1,
          weight: 1,
          place: 1,
          paid: 1,
          emergencyContact: {
            name: 1,
            relation: 1,
            phone: 1,
          },
          active: "$user.active",
          email: "$user.email",
          password: "$user.password",
        },
      },
    ]);
    const formattedPatients = patients.map((p) => ({
      userId: p.userId,
      firstName: p.firstName,
      lastName: p.lastName,
      gender: p.gender,
      phone: p.phone,
      age: p.age,
      blood_group: p.blood_group,
      height: p.height,
      weight: p.weight,
      place: p.place,
      paid: p.paid,

      emergencyContactname: p.emergencyContact?.name || "",
      emergencyContactrelation: p.emergencyContact?.relation || "",
      emergencyContactphone: p.emergencyContact?.phone || "",

      active: p.active,
      email: p.email,
      password: p.password,
    }));
    return res.status(201).json({
      success: true,
      message: "patient data",
      data: formattedPatients,
    });
  } catch (error) {
    console.error("Error fetching patients:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getPatientById = async (req, res) => {
  const { userId } = req.params;

  try {
    const patients = await Patient.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 1,
          userId: 1,
          firstName: 1,
          lastName: 1,
          gender: 1,
          phone: 1,
          age: 1,
          blood_group: 1,
          height: 1,
          weight: 1,
          place: 1,
          active: "$user.active",
          email: "$user.email",
          password: "$user.password",
          emergencyContact: {
            name: 1,
            relation: 1,
            phone: 1,
          },
        },
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "patient data",
      data: patients[0],
    });
  } catch (error) {
    console.error("Error fetching patients:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getEmergencyContactById = async (req, res) => {
  try {
    const { userId } = req.params;

    const data = await Patient.findOne(
      { userId },
      { emergencyContact: 1, _id: 0 }
    );

    if (!data || !data.emergencyContact) {
      return res.status(404).json({
        success: false,
        message: "Emergency contact not found"
      });
    }

    res.status(200).json({
      success: true,
      emergencyContact: data.emergencyContact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const updateEmergencyContact = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, relation, phone } = req.body;

    const updated = await Patient.findOneAndUpdate(
      { userId },
      {
        $set: {
          "emergencyContact.name": name,
          "emergencyContact.relation": relation,
          "emergencyContact.phone": phone
        }
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Emergency contact updated successfully",
      emergencyContact: updated.emergencyContact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  patientOtpValidator,
  registerPatientDetails,
  updatePatientDetails,
  deletingPatientDetails,
  getPatient,
  getPatientById,
  getEmergencyContactById,
  updateEmergencyContact
};
