const Users = require("../models/userSchema");
const Appointment = require("../models/appointmentSchema");
const Feedback = require("../models/feedbackSchema");
const Report = require("../models/reportSchema");

const totalDoctors = async (req, res) => {
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
const totalPatients = async (req, res) => {
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
const totalAppointment = async (req, res) => {
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
const totalFeedback = async (req, res) => {
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
const totalReport = async (req, res) => {
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
const appintmentStatusReport = async (req, res) => {
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
const appointmentWeekReport =  async(req,res) => {
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

module.exports = {
  totalDoctors,
  totalPatients,
  totalAppointment,
  totalFeedback,
  totalReport,
  appintmentStatusReport,
  appointmentWeekReport
};
