const ejs = require("ejs");
const path = require("path");
const createPdf = require("../utils/reportPdfGenerator");
const uploadPdfBuffer = require("../utils/cloudinaryUpload");
const reportMailSender = require("../utils/reportMailSender");
const Report = require("../models/reportSchema");
const { title } = require("process");
const mongoose = require("mongoose");
const https = require("https");
const cloudinary = require("cloudinary").v2;
const Patient = require("../models/patientSchema");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createReport = async (req, res) => {
  const { patientId, doctorId, title, tableData, } = req.body;
   
    userId = patientId  
    const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
const dd = String(today.getDate()).padStart(2, "0");

const formattedDate = `${yyyy}-${mm}-${dd}`;
console.log(formattedDate); 
  try {
     const getUser = await Patient.findOne({ userId });
    if (!getUser) {
      return res.status(404).json({ message: "patient not found" });
    }
    const ejsFilePath = path.join(
      __dirname,
      "../utils",
      "labReportTemplate.ejs"
    )
    const data = {
      logo: "https://res.cloudinary.com/dvlal7skv/image/upload/v1763488647/Green_and_White_Modern_Medical_Logo_1__page-0001_jujlbb.jpg",

      firstName: getUser.firstName,
      lastName: getUser.lastName,
      phone: getUser.phone,
      gender: getUser.gender,
      amount: "250 USD",
      date: formattedDate,

      tableFields: [
        { label: "Test Name", key: "testName" },
        { label: "Result", key: "result" },
        { label: "Unit", key: "unit" },
        { label: "Reference Range", key: "reference" },
      ],

      tableData
     
    };
    const { buffer } = await createPdf(ejsFilePath, data);
    await reportMailSender(buffer);

    const customPublicId = `report_${Date.now()}`; // need to customise while creating frontend
    const result = await uploadPdfBuffer(buffer, customPublicId);

    // res.set({
    //   "Content-Type": "application/pdf",
    //   "Content-Disposition": "attachment; filename=example.pdf",
    // });
    const saveReport = await Report.create({
      patientId,
      doctorId,
      title,
      reportType:"lab report",
      fileUrl: result.secure_url,
      public_id: result.public_id,
    });
    return res.json({
      message: "PDF uploaded successfully  and saved to db",
      url: result.secure_url,
      public_id: result.public_id,
      data: saveReport,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating PDF");
  }
};

const getReport = async (req, res) => {
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
          _id: 1,
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
      message: "report data",
      data: report,
    });
  } catch (error) {
    console.error("Error fetching repots:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const deleteReport = async (req, res) => {};
const downloadReport = async (req, res) => {
  try {
    const reportId = req.params.reportId;
    if (!reportId) {
      return res.status(400).send("Missing file URL");
    }
    const repo = await Report.findById(reportId);
    if (!repo) {
      return res
        .status(409)
        .json({ success: false, message: "no report in db" });
    }
    fileUrl = repo.fileUrl[0];

    // Set headers for download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=cloudinary_report.pdf"
    );

    https
      .get(fileUrl, (cloudRes) => {
        if (cloudRes.statusCode !== 200) {
          console.error("Cloudinary returned:", cloudRes.statusCode);
          return res.status(500).send("Failed to download file");
        }

        cloudRes.pipe(res);
      })
      .on("error", (err) => {
        console.error("HTTPS error:", err);
        return res.status(500).send("Error during file download");
      });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).send("Internal server error");
  }
};
const getReportForPatient = async (req, res) => {
    const {userId} = req.params

  try {
    const report = await Report.aggregate([
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
          doctorName: {
            $concat: ["$doctor.firstName", " ", "$doctor.lastName"],
          },
          doctorDepartment: "$doctor.department",
          title: 1,
          reportType: 1,
          fileUrl: 1,
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
      message: "report data",
      data: report,
    });
  } catch (error) {
    console.error("Error fetching repots:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = { createReport, getReport, downloadReport,getReportForPatient };
