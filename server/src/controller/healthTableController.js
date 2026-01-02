const mongoose = require("mongoose");
const HealthTable = require("../models/healthSchema");

// create
const createHealthTable = async (req, res) => {
  const { doctorId } = req.params;
  const {
    patientId,
    Blood_pressure,
    Heart_rate,
    Body_temperature,
    Respiratory_rate,
    Oxygen_saturation,
    Blood_sugar,
  } = req.body;
  try {
    const existingpatient = await HealthTable.findOne({ patientId });
    if (existingpatient) {
      return res.status(409).json({ success: false, message: "patient data exist already " });
    }
    const data = await HealthTable.create({
      doctorId,
      patientId,
      Blood_pressure,
      Heart_rate,
      Body_temperature,
      Respiratory_rate,
      Oxygen_saturation,
      Blood_sugar,
    });
    return res.status(201).json({
      success: true,
      message: "health data saved successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error saving health data:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getHelathTable = async (req, res) => {
  try {
    const data = await HealthTable.aggregate([
      {
        $lookup: {
          from: "patients",
          localField: "patientId",
          foreignField: "userId",
          as: "patient",
        },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "doctorId",
          foreignField: "userId",
          as: "doctor",
        },
      },
      { $unwind: "$patient" },
      { $unwind: "$doctor" },
      {
        $project: {
          _id: 1,
          patientName: {
            $concat: ["$patient.firstName", " ", "$patient.lastName"],
          },
          gender: "$patient.gender",
          age: "$patient.age",
          blood_group: "$patient.blood_group",
          height: "$patient.height",
          weight: "$patient.weight",
          doctorName: {
            $concat: ["$doctor.firstName", " ", "$doctor.lastName"],
          },
          doctorDepartment: "$doctor.department",
          Blood_pressure: 1,
          Heart_rate: 1,
          Body_temperature: 1,
          Respiratory_rate: 1,
          Oxygen_saturation: 1,
          Blood_sugar: 1,
          createdAt: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M",
              date: "$createdAt",
              timezone: "Asia/Kolkata", // optional
            },
          },
        },
      },
    ]);
    return res.status(201).json({
      success: true,
      message: "health data",
      data: data,
    });
  } catch (error) {
     console.error("Error fetching healthdata:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getHelathTablePatient = async (req, res) => {
  const {userId} = req.params
  try {
    const data = await HealthTable.aggregate([
      {
              $match: { patientId: new mongoose.Types.ObjectId(userId) }
            },
      {
        $lookup: {
          from: "patients",
          localField: "patientId",
          foreignField: "userId",
          as: "patient",
        },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "doctorId",
          foreignField: "userId",
          as: "doctor",
        },
      },
      { $unwind: "$patient" },
      { $unwind: "$doctor" },
      {
        $project: {
          _id: 1,
          patientName: {
            $concat: ["$patient.firstName", " ", "$patient.lastName"],
          },
          gender: "$patient.gender",
          age: "$patient.age",
          blood_group: "$patient.blood_group",
          height: "$patient.height",
          weight: "$patient.weight",
          doctorName: {
            $concat: ["$doctor.firstName", " ", "$doctor.lastName"],
          },
          doctorDepartment: "$doctor.department",
          Blood_pressure: 1,
          Heart_rate: 1,
          Body_temperature: 1,
          Respiratory_rate: 1,
          Oxygen_saturation: 1,
          Blood_sugar: 1,
          createdAt: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "Asia/Kolkata", // optional
            },
          },
        },
      },
    ]);
    return res.status(201).json({
      success: true,
      message: "health data",
      data: data,
    });
  } catch (error) {
     console.error("Error fetching health data:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { createHealthTable,getHelathTable,getHelathTablePatient };
