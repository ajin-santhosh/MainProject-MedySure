const Doctor = require("../models/docterSchema");

// create doctor

const registerDoctor = async (otherData, userId) => {
  try {
    const newDoctor = await Doctor.create({
      userId,
      ...otherData,
    });
    return newDoctor;
  } catch (error) {
    console.error("Error creating doctor in doctor collection:", error);
    throw error;
  }
};
//
// updated docter collection
const updateDoctordetails = async (userId, otherData) => {
  try {
    const updatingdoctor2 = await Doctor.findOneAndUpdate(
      { userId: userId }, // filter
      { $set: otherData }, // update
      { new: true }
    );
    return updatingdoctor2;
  } catch (error) {
    console.error("Error updating doctor in doctor collection:", error);
    throw error;
  }
};
//
// delete dcotor from doctor collection
const deletingDoctorDetails = async (userId) => {
  try {
    const deletedDoctor = await Doctor.findOneAndDelete({ userId: userId });

    if (!deletedDoctor) {
      return { message: "Doctor not found" };
    }

    return deletedDoctor;
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw error;
  }
};
//
// show all doctrors
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  {
    $project: {
      
_id:1,
userId:1,
firstName:1,
lastName:1,
gender:1,
experiance:1,
department:1,
qualification:1,
active:"$user.active",
email: "$user.email" 
    }
  }
])
    return res.status(201).json({
      success:true,
      message: "doctor data",
      data: doctors,
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res.status(500).json({ success:false, message: "Internal Server Error" });
  }
};

module.exports = { registerDoctor, updateDoctordetails, deletingDoctorDetails,getDoctors };
