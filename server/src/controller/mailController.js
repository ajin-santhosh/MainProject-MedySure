const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

const patientSignInMailVerfication = async (userEmail) => {
  if (!userEmail) {
    return false;
  }

  const secret = process.env.OTP_SECRET + userEmail;

  // Generate OTP valid for 5 minutes (300 seconds)
  const token = speakeasy.totp({
    secret: secret,
    encoding: "ascii",
    step: 300, // 5 minutes validity
    digits: 6,
  });
  console.log("BEFORE SENDMAIL");

  try {
    const info = await transporter.sendMail({
      from: `"MedySure" <medysurepvtlmtd@gmail.com>`,
      to: userEmail,
      subject: "MedySure OTP for verification",
      html: `
    <div style="font-family: Arial, sans-serif; padding: 10px;">
      <p>Your OTP for verification is:</p>

      <h1 style="color: #333; letter-spacing: 3px;">${token}</h1>

      <p>This OTP is valid for <strong>5 minutes</strong>.</p>

      <p style="margin-top: 20px;">Thanks,<br>MedySure Team</p>
    </div>
  `,
    });
    console.log("AFTER SENDMAIL");
    return true;
  } catch (error) {
    console.error("MAIL FAILED ", error);
    return false;
  }
};

module.exports = { patientSignInMailVerfication };
