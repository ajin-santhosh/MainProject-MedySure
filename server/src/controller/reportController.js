const ejs = require("ejs");
const path = require("path");
const createPdf = require("../utils/reportPdfGenerator");
const uploadPdfBuffer = require("../utils/cloudinaryUpload");
const reportMailSender = require("../utils/reportMailSender")
const Report = require("../models/reportSchema")

const createReport = async (req, res) => {
  const {patientId,doctorId,title,description} = req.body
  try {
    const ejsFilePath = path.join(
      __dirname,
      "../utils",
      "labReportTemplate.ejs"
    );
    const data = {
      logo: "https://res.cloudinary.com/dvlal7skv/image/upload/v1763488647/Green_and_White_Modern_Medical_Logo_1__page-0001_jujlbb.jpg",

      firstName: "John",
      lastName: "Doe",
      phone: "+1 555-123-4567",
      gender: "Male",
      amount: "250 USD",
      date: "2025-01-15",

      tableFields: [
        { label: "Test Name", key: "testName" },
        { label: "Result", key: "result" },
        { label: "Unit", key: "unit" },
        { label: "Reference Range", key: "reference" },
      ],

      tableData: [
        {
          testName: "Hemoglobin",
          result: "14.2",
          unit: "g/dL",
          reference: "13.0 - 17.0",
        },
        {
          testName: "WBC Count",
          result: "6.5",
          unit: "×10^9/L",
          reference: "4.0 - 11.0",
        },
        {
          testName: "Platelet Count",
          result: "220",
          unit: "×10^9/L",
          reference: "150 - 400",
        },
      ],
    };
    const { buffer } = await createPdf(ejsFilePath, data);
    await reportMailSender(buffer)

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
      fileUrl: result.secure_url,
      public_id:result.public_id
      })
    return res.json({
      message: "PDF uploaded successfully  and saved to db",
      url: result.secure_url,
      public_id: result.public_id,
      data:saveReport
    })
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating PDF");
  }
};
module.exports = { createReport };
