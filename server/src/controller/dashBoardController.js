const Users = require("../models/userSchema");
const Appointment = require("../models/appointmentSchema");
const Feedback = require("../models/feedbackSchema");
const Report = require("../models/reportSchema");
const Patient = require("../models/patientSchema");
const mongoose = require("mongoose");

const totalDoctors = async (req, res) => {     // for getting total doctor count
  try {
    const doctors = await Users.aggregate([
      { $match: { role: "doctor" } },
      {
        $group: {
          _id: "$role",
          total: { $sum: 1 },
        },
      },
    ]);
    res.json(doctors[0] || { total: 0 });
  } catch (error) {
    console.error("Error fetching doctor count:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const totalPatients = async (req, res) => {  // for getting total Patient count
  try {
    const patients = await Users.aggregate([
      { $match: { role: "patient" } },
      {
        $group: {
          _id: "$role",
          total: { $sum: 1 },
        },
      },
    ]);
    res.json(patients[0] || { total: 0 });
  } catch (error) {
    console.error("Error fetching patient count:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const totalAppointment = async (req, res) => {   // for getting total appointment count
  try {
    const total = await Appointment.countDocuments();
    return res.status(201).json({
      success: true,
      message: "total appointments",
      data: total,
    });
  } catch (error) {
    console.error("Error fetching appointment count:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const totalFeedback = async (req, res) => {    // for getting total feedback count
  try {
    const total = await Feedback.countDocuments();
    return res.status(201).json({
      success: true,
      message: "total feedbacks",
      data: total,
    });
  } catch (error) {
    console.error("Error fetching feedbacks count:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const totalReport = async (req, res) => {  // for getting total report count
  try {
    const total = await Report.countDocuments();
    return res.status(201).json({
      success: true,
      message: "total reports",
      data: total,
    });
  } catch (error) {
    console.error("Error fetching reports count:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const appintmentStatusReport = async (req, res) => { // for getting appointmet status count
  try {
    const total = await Appointment.aggregate([
      {
    $facet: {
      byStatus: [
        {
          $group: {
            _id: "$status",
            total: { $sum: 1 }
          }
        }
      ]
    }
  }
    ]);
    return res.status(201).json({
      success: true,
      message: "appointment status",
      status: total[0].byStatus
    });
  } catch (error) {
    console.error("Error fetching appointment status:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const appointmentWeekReport =  async(req,res) => {  // for getting appointment week count
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    try{
       const data = await Appointment.aggregate([
  {
    $match: {
      
      appointmentDate: { $gte: sevenDaysAgo }
    }
  },
  {
    $group: {
      _id: {
        $dateToString: { format: "%Y-%m-%d", date: "$appointmentDate" }
      },
      count: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  }
]);
return res.status(201).json({
      success: true,
      message: "appointment week report",
      data:data  
    });
    }
    catch(error){
        console.error("Error fetching appointment status:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }

    
}

const patientWeekReport =  async(req,res) => {  // for getting patient week report
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    try{
       const data = await Patient.aggregate([
  {
    $match: {
      
      
       createdAt: { $gte: sevenDaysAgo }
    }
  },
  {
    $group: {
      _id: {
        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
      },
      count: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  }
]);
return res.status(201).json({
      success: true,
      message: "Patient week report",
      data:data  
    });
    }
    catch(error){
        console.error("Error fetching patient week status:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
    
}
const acivePatientCount =  async (req,res) => {
try {
    const patients = await Users.aggregate([
      { $match: { role: "patient" } },
      {
        $group: {
          _id: "$active",
          total: { $sum: 1 },
        },
      },
    ]);
    res.json(patients[0] || { total: 0 });
  } catch (error) {
    console.error("Error fetching patient stauts count:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
const totalAppointmentByPatient = async (req,res) => {
  const {id} = req.params
    try {
    const totalCount = await Appointment.countDocuments({
      patientId: new mongoose.Types.ObjectId(id)
    })
   return res.status(201).json({
      success: true,
      message: "Patient apointment count",
      data: totalCount  
    })
  } catch (error) {
    console.error("Error fetching patient appointment count:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
const totalFeedbackByPatient = async (req,res) => {
  const {id} = req.params
    try {
    const totalCount = await Feedback.countDocuments({
      patientId: new mongoose.Types.ObjectId(id)
    })
   return res.status(201).json({
      success: true,
      message: "Patient feedback count",
      data: totalCount  
    })
  } catch (error) {
    console.error("Error fetching patient feedback count:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
const totalReportsByPatient = async (req,res) => {
  const {id} = req.params
    try {
    const totalCount = await Report.countDocuments({
      patientId: new mongoose.Types.ObjectId(id)
    })
   return res.status(201).json({
      success: true,
      message: "Patient report count",
      data: totalCount  
    })
  } catch (error) {
    console.error("Error fetching patient report count:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
// for getting patinet appointmet status count
const patientAppintmentStatusReport = async (req, res) => { 
   const {userId} = req.params
  try {
    const total = await Appointment.aggregate([
      {
      $match: {
        patientId: new mongoose.Types.ObjectId(userId)  // filter by patient
      }
    },
      {
    $facet: {
      byStatus: [
        {
          $group: {
            _id: "$status",
            total: { $sum: 1 }
          }
        }
      ]
    }
  }
    ]);
    return res.status(201).json({
      success: true,
      message: "appointment status",
      status: total[0].byStatus
    });
  } catch (error) {
    console.error("Error fetching appointment status:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  totalDoctors,
  totalPatients,
  totalAppointment,
  totalFeedback,
  totalReport,
  appintmentStatusReport,
  appointmentWeekReport,
  patientWeekReport,
  acivePatientCount,
  totalAppointmentByPatient,
  totalFeedbackByPatient,
  totalReportsByPatient,
  patientAppintmentStatusReport,
};
