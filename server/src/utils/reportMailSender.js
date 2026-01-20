const axios = require("axios");

const reportMailSender = async (pdfBuffer, userEmail) => {
  // console.log("PDF BUFFER SIZE (bytes):", pdfBuffer?.length);
  try {
    const buffer = Buffer.from(pdfBuffer);
    const pdfBase64 = buffer.toString("base64");

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "MedySure",
          email: `medysurepvtlmtd@gmail.com`, // VERIFIED SENDER
        },
        to: [{ email: userEmail }],
        subject: "MedySure  report",
        htmlContent: `
             <div style="font-family: Arial, sans-serif; padding: 10px;">
      <p>Your Report :</p>
      <p style="margin-top: 20px;">Thanks,<br>MedySure Team</p>
    </div>
            `,
        attachment: [
          {
            content: pdfBase64,
            name: "report.pdf",
          },
        ],
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      },
    );
    console.log("Email with buffer sent!");
    return true;
  } catch (error) {
    console.error("EMAIL FAILED ", error.response?.data || error.message);
    return false;
  }
};
module.exports = reportMailSender;
