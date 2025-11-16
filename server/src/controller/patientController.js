const speakeasy = require("speakeasy");
const Patient = require("../models/patientSchema");
const Users = require("../models/userSchema");
const patientOtpValidator = async (req, res) => {
  const { userId } = req.params;
  const { otp } = req.body;
  try {
    if (!userId || !otp) {
      return res.status(400).json({ message: "userid and otp are required" });
    }
    const secret = Buffer.from(userId.toString()).toString("base64")
    const isValid = speakeasy.totp.verify({
        secret: secret,
        encoding: "base64",
        token: otp,
        step: 300,  // Must match send step
        window: 0   // No time drift allowed
    })
    console.log(otp,secret)
    if (!isValid) {
       const del = await Users.findByIdAndDelete(userId) 
       return res
        .status(500)
        .json({ success: false, message: "Invalid or expired OTP and user is deleted",del });
    }

    return res
        .status(201)
        .json({ success: true, message: "OTP verified successfully!" });
  } catch (error) {
     console.error("Error otp verification:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {patientOtpValidator}
