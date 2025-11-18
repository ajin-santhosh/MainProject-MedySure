const ejs = require("ejs");
const path = require("path");
const createPdf = require("../utils/reportPdfGenerator");

const createReport = async (req, res) => {
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

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=example.pdf",
    });

    return res.end(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating PDF");
  }
};

module.exports = { createReport };
