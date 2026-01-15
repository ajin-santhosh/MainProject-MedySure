const bcrypt = require("bcrypt");
const Users = require("../models/userSchema");
const { Parser } = require("json2csv");
const Doctor = require("../models/docterSchema");
const Patient = require("../models/patientSchema");
const Appointment = require("../models/appointmentSchema");
const Report = require("../models/reportSchema");
const Feedback = require("../models/feedbackSchema");
const Payment = require("../models/paymentSchema");
const mongoose = require("mongoose");

// Create Admin controller
const createAdmin = async (req, res) => {
  const { email, password, active } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "email and password are required" });
    }
    const existingadmin = await Users.findOne({ email });
    if (existingadmin) {
      return res
        .status(409)
        .json({ success: false, message: "mail id already used" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      email,
      password: hashPassword,
      role: "admin",
      active,
    });
    return res.status(201).json({
      success: true,
      message: "admin registered successfully",
      data: { email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//
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
      return res
        .status(409)
        .json({ success: false, message: "admin not exist in db" });
    }

    if (email) {
      const existingemail = await Users.findOne({
        email,
        _id: { $ne: userId },
      });
      if (existingemail) {
        return res
          .status(409)
          .json({ success: false, message: "mail id already in use" });
      }
      updatingAdmin.email = email;
    }
    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      updatingAdmin.password = hashPassword;
    }

    updatingAdmin.active = active;

    const updatedAdmin = await updatingAdmin.save();
    return res.status(201).json({
      success: true,
      message: "admin updated successfully",
      data: { email: updatedAdmin.email, role: updatedAdmin.role },
    });
  } catch (error) {
    console.error("Error updating admin:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//
//Show admins
const getAdmins = async (req, res) => {
  try {
    const getAdmin = await Users.find({ role: "admin" });
    return res.status(201).json({
      success: true,
      message: "admin data",
      data: getAdmin,
    });
  } catch (error) {
    console.error("Error in getting admin:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
//
// delete admin
const deleteAdmin = async (req, res) => {
  const { userId } = req.params;
  try {
    const del = await Users.findByIdAndDelete(userId);
    return res.status(201).json({
      success: true,
      message: "admin deleted successfully",
      data: del,
    });
  } catch (error) {
    console.error("Error in deleting admin:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const exportCsvAdmin = async (req, res) => {
  try {
    const users = await Users.find({ role: "admin" }).lean();
    if (!users.length) {
      return res.status(404).json({ message: "No data found" });
    }
    const fields = ["name", "email", "role", "active", "createdAt"];
    const parser = new Parser({ fields });
    const csv = parser.parse(users);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=users.csv");

    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ message: "Error exporting CSV" });
  }
};
const exportCsvDoctors = async (req, res) => {
  try {
    const users = await Doctor.aggregate([
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
          firstName: 1,
          lastName: 1,
          gender: 1,
          experiance: 1,
          department: 1,
          qualification: 1,
          createdAt: 1,
          active: "$user.active",
          email: "$user.email",
        },
      },
    ]);
    if (!users.length) {
      return res.status(404).json({ message: "No data found" });
    }
    const fields = [
      "email",
      "active",
      "firstName",
      "lastName",
      "gender",
      "experiance",
      "department",
      "qualification",
      "createdAt",
    ];
    const parser = new Parser({ fields });
    const csv = parser.parse(users);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=users.csv");

    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ message: "Error exporting CSV" });
  }
};
const exportCsvPatient = async (req, res) => {
  try {
    const users = await Patient.aggregate([
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
          firstName: 1,
          lastName: 1,
          gender: 1,
          phone: 1,
          age: 1,
          blood_group: 1,
          height: 1,
          weight: 1,
          place: 1,
          createdAt: 1,
          active: "$user.active",
          email: "$user.email",
        },
      },
    ]);
    if (!users.length) {
      return res.status(404).json({ message: "No data found" });
    }
    const fields = [
      "email",
      "active",
      "firstName",
      "lastName",
      "gender",
      "phone",
      "age",
      "blood_group",
      "height",
      "weight",
      "place",
      "createdAt",
    ];
    const parser = new Parser({ fields });
    const csv = parser.parse(users);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=users.csv");

    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ message: "Error exporting CSV" });
  }
};
const exportCsvAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.aggregate([
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
          appointmentDate: 1,
          title: 1,
          description: 1,
          status: 1,
          payment: 1,
          createdAt: 1,
          notes: 1,
          patientName: {
            $concat: ["$patient.firstName", " ", "$patient.lastName"],
          },
          doctorName: {
            $concat: ["$doctor.firstName", " ", "$doctor.lastName"],
          },
          doctorDepartment: "$doctor.department",
        },
      },
    ]);
    if (!appointments.length) {
      return res.status(404).json({ message: "No data found" });
    }
    const fields = [
      "appointmentDate",
      "title",
      "description",
      "notes",
      "status",
      "payment",
      "patientName",
      "doctorName",
      "doctorDepartment",
      "createdAt",
    ];
    const parser = new Parser({ fields });
    const csv = parser.parse(appointments);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=users.csv");

    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ message: "Error exporting CSV" });
  }
};
const exportCsvReports = async (req, res) => {
  try {
    const report = await Report.aggregate([
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
          patientName: {
            $concat: ["$patient.firstName", " ", "$patient.lastName"],
          },
          doctorName: {
            $concat: ["$doctor.firstName", " ", "$doctor.lastName"],
          },
          doctorDepartment: "$doctor.department",
          title: 1,
          reportType: 1,
          fileUrl: 1,
          createdAt: 1,
        },
      },
    ]);
    if (!report.length) {
      return res.status(404).json({ message: "No data found" });
    }
    const fields = [
      "patientName",
      "doctorName",
      "doctorDepartment",
      "title",
      "reportType",
      "fileUrl",
      "createdAt",
    ];
    const parser = new Parser({ fields });
    const csv = parser.parse(report);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=reports.csv");

    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ message: "Error exporting CSV" });
  }
};
const exportCsvFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.aggregate([
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
      {
        $lookup: {
          from: "appointments",
          localField: "appointmentId",
          foreignField: "_id",
          as: "appointment",
        },
      },
      { $unwind: "$patient" },
      { $unwind: "$doctor" },
      { $unwind: "$appointment" },

      {
        $project: {
          rating: 1,
          description: 1,
          createdAt: 1,
          appointment: "$appointment.title",
          patientName: {
            $concat: ["$patient.firstName", " ", "$patient.lastName"],
          },
          doctorName: {
            $concat: ["$doctor.firstName", " ", "$doctor.lastName"],
          },
          doctorDepartment: "$doctor.department",
        },
      },
    ]);
    if (!feedbacks.length) {
      return res.status(404).json({ message: "No data found" });
    }
    const fields = [
      "rating",
      "description",
      "createdAt",
      "appointment",
      "patientName",
      "doctorName",
      "doctorDepartment",
    ];
    const parser = new Parser({ fields });
    const csv = parser.parse(feedbacks);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=feedbacks.csv");

    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ message: "Error exporting CSV" });
  }
};
const exportCsvPayments = async (req, res) => {
  try {
    const payments = await Payment.aggregate([
      {
        $lookup: {
          from: "appointments",
          localField: "appointmentId",
          foreignField: "_id",
          as: "appointment",
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
      { $unwind: "$appointment" },
      { $unwind: "$doctor" },

      {
        $project: {
          type: 1,
          amount: 1,
          paymentIntentId: 1,
          appointment_title: "$appointment.title",
          appointment_status: "$appointment.status",
          doctorName: {
            $concat: ["$doctor.firstName", " ", "$doctor.lastName"],
          },
          doctorDepartment: "$doctor.department",
          createdAt: 1,
        },
      },
    ]);
    if (!payments.length) {
      return res.status(404).json({ message: "No data found" });
    }
    const fields = [
      "type",
      "amount",
      "appointment_title",
      "appointment_status",
      "doctorName",
      "doctorDepartment",
      "paymentIntentId",
      "createdAt",
    ];
    const parser = new Parser({ fields });
    const csv = parser.parse(payments);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=payments.csv");

    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ message: "Error exporting CSV" });
  }
};

module.exports = {
  createAdmin,
  updateAdmin,
  getAdmins,
  deleteAdmin,
  exportCsvAdmin,
  exportCsvDoctors,
  exportCsvPatient,
  exportCsvAppointments,
  exportCsvReports,
  exportCsvFeedbacks,
  exportCsvPayments,
};
