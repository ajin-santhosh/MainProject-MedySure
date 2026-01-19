const speakeasy = require("speakeasy");
const axios = require("axios");


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
   const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "MedySure",
          email: `medysurepvtlmtd@gmail.com`, // VERIFIED SENDER
        },
        to: [
          { email: userEmail }
        ],
        subject: "MedySure OTP Verification",
        htmlContent: `
         <div style="font-family: Arial, sans-serif; padding: 10px;">
      <p>Your OTP for verification is:</p>
      <h1 style="color: #333; letter-spacing: 3px;">${token}</h1>
      <p>This OTP is valid for <strong>5 minutes</strong>.</p>
      <p style="margin-top: 20px;">Thanks,<br>MedySure Team</p>
      </div>

        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    console.log("MAIL SENT ✅", response.data);
    return true;
  } catch (error) {
    console.error("MAIL FAILED ", error);
    return false;
  }
};

module.exports = { patientSignInMailVerfication };
