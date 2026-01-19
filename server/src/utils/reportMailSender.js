const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});
const reportMailSender = async (pdfBuffer) => {
    // const transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //       user: process.env.email,
    //       pass: process.env.emailPassword,
    //     },
    //   });
    try {
    const info = await transporter.sendMail({
      from: `"MedySure" <medysurepvtlmtd@gmail.com>`,
      to: "ajindemo555@gmail.com",
      subject: "MedySure  report",
      html: `
    <div style="font-family: Arial, sans-serif; padding: 10px;">
      <p>Your Report :</p>

      <p style="margin-top: 20px;">Thanks,<br>MedySure Team</p>
    </div>
  `,
      attachments: [
      {
        filename: "report.pdf",
        content: pdfBuffer,
        contentType: "application/pdf"
      }
    ]
      
    });
    console.log("Email with buffer sent!");
    return true;
  } catch (error) {
    console.log("Message sent:", info.messageId);
    throw error;
  }
}
module.exports = reportMailSender