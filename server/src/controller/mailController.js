const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");

const patientSignInMailVerfication = async (userId,userEmail) => {
  if (!userId) {
    return false;
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.emailPassword,
    },
  });
  const secret = Buffer.from(userId.toString()).toString("base64");

    // Generate OTP valid for 5 minutes (300 seconds)
    const token = speakeasy.totp({
        secret: secret,
        encoding: "base64",
        step: 300,      // 5 minutes validity
        digits: 6
    });

  try {
    const info = await transporter.sendMail({
      from: process.env.email,
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
    return true;
  } catch (error) {
    console.log("Message sent:", info.messageId);
    throw error;
  }
};

module.exports = { patientSignInMailVerfication };
