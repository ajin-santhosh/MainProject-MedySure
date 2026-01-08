const Appointment = require("../models/appointmentSchema");
const { Temporal } = require("@js-temporal/polyfill");
const mongoose = require("mongoose");
//Create
const createAppointment = async (req, res) => {
  const {
    patientId,
    doctorId,
    reportId,
    paymentId,
    appointmentDate,
    title,
    description,
    status,
    notes,
    payment,
  } = req.body;
  try {
    if (!patientId || !doctorId || !appointmentDate || !title) {
      return res
        .status(409)
        .json({ success: false, message: "mandatory fields are missing" });
    }
    const appointmentDateTime = new Date(appointmentDate); // convert to Date

    if (appointmentDateTime < new Date()) {
      console.log("Selected date & time is in the past");
      return res
        .status(409)
        .json({ success: false, message: "please select a present data" });
    }

    const newAppointment = await Appointment.create({
      patientId,
      doctorId,
      reportId,
      paymentId,
      appointmentDate,
      title,
      description,
      status,
      notes,
      payment,
    });
    return res.status(201).json({
      success: true,
      message: "appointment created successfully",
      data: newAppointment,
    });
  } catch (error) {
    console.error("Error  creating appointment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//Update
const updateAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const updateData = req.body;
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "appointment not found" });
    }
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { $set: updateData },
      { new: true }
    );
    return res.status(201).json({
      success: true,
      message: "appointment updated successfully",
      data: updatedAppointment,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//Delete
const deleteAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      appointmentId
    );
    if (!deleteAppointment) {
      return res
        .status(404)
        .json({ success: false, message: "appointment not found" });
    }
    return res.status(201).json({
      success: true,
      message: "appointment deleted successfully",
      data: deletedAppointment,
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//Get
const getAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.aggregate([
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
          reportId: 1,
          appointmentDate: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M",
              date: "$appointmentDate",
              timezone: "Asia/Kolkata", // optional
            },
          },
          title: 1,
          description: 1,
          status: 1,
          payment: 1,
          patientName: {
            $concat: ["$patient.firstName", " ", "$patient.lastName"],
          },
          doctorName: {
            $concat: ["$doctor.firstName", " ", "$doctor.lastName"],
          },
          doctorDepartment: "$doctor.department",
        },
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "appointments ",
      data: appointments,
    });
  } catch (error) {
    console.error("Error in getting appointments:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getAppointmentForCalanadar = async (req, res) => {
  try {
    const appointments = await Appointment.aggregate([
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
          start: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M",
              date: "$appointmentDate",
              timezone: "Asia/Kolkata", // optional
            },
          },
          end: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M",
              date: "$appointmentDate",
              timezone: "Asia/Kolkata", // optional
            },
          },
          title: 1,
          patientName: {
            $concat: ["$patient.firstName", " ", "$patient.lastName"],
          },
          doctorName: {
            $concat: ["$doctor.firstName", " ", "$doctor.lastName"],
          },
        },
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "appointments ",
      data: appointments,
    });
  } catch (error) {
    console.error("Error in getting appointments:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
// appointment for patient individual

const getAppointmentForPatient = async (req, res) => {
  const { userId } = req.params;
  try {
    const appointments = await Appointment.aggregate([
      {
        $match: { patientId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "doctors",
          localField: "doctorId",
          foreignField: "userId",
          as: "doctor",
        },
      },
      { $unwind: "$doctor" },
      {
        $project: {
          _id: 1,
          reportId: 1,
          createdAt: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M",
              date: "$createdAt",
              timezone: "Asia/Kolkata", // optional
            },
          },
          appointmentDate: {
            $dateToString: {
              format: "%Y-%m-%d %H:%M",
              date: "$appointmentDate",
              timezone: "Asia/Kolkata", // optional
            },
          },
          title: 1,
          description: 1,
          notes: 1,
          status: 1,
          payment: 1,
          doctorName: {
            $concat: ["$doctor.firstName", " ", "$doctor.lastName"],
          },
          doctorDepartment: "$doctor.department",
          doctorId: 1,
        },
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "appointments ",
      data: appointments,
    });
  } catch (error) {
    console.error("Error in getting appointments:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getAppointmentForPatientHelathBoard = async (req, res) => {
  const { userId } = req.params;
  try {
    const appointments = await Appointment.aggregate([
      {
        $match: {
          patientId: new mongoose.Types.ObjectId(userId),
          status: "completed",
        },
      },
      { $sort: { appointmentDate: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 1,
          appointmentDate: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$appointmentDate",
              timezone: "Asia/Kolkata", // optional
            },
          },
          title: 1,
        },
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "appointments ",
      data: appointments,
    });
  } catch (error) {
    console.error("Error in getting appointments:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getAppointmentForDoctor = async (req, res) => {
  const { userId } = req.params;
  try {
    const appointments = await Appointment.aggregate([
      {
        $match: { doctorId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "patients",
          localField: "patientId",
          foreignField: "userId",
          as: "patient",
        },
      },
      { $unwind: "$patient" },
      {
        $project: {
          _id: 1,
          reportId: 1,
          patientId: 1,
          appointmentDate: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$appointmentDate",
              timezone: "Asia/Kolkata", // optional
            },
          },
           appointmentTime: {
            $dateToString: {
              format: "%H:%M",
              date: "$appointmentDate",
              timezone: "Asia/Kolkata", // optional
            },
          },
          title: 1,
          description: 1,
          status: 1,
          payment: 1,
          notes: 1,

          createdAt: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$appointmentDate",
              timezone: "Asia/Kolkata", // optional
            },
          },
          patientName: {
            $concat: ["$patient.firstName", " ", "$patient.lastName"],
          },
        },
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "appointments ",
      data: appointments,
    });
  } catch (error) {
    console.error("Error in getting appointments:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const doctorAddNotes = async (req, res) => {
  const { appointmentId } = req.params;
  const { notes } = req.body;
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "appointment not found" });
    }
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { $set: { notes } }
    );
    return res.status(201).json({
      success: true,
      message: "Note Added succecfully ",
      data: updatedAppointment,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const doctorUpdateAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { appointmentDate, status } = req.body;
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "appointment not found" });
    }
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { $set: { appointmentDate, status } },
      { new: true }
    );
    return res.status(201).json({
      success: true,
      message: "appointment updated successfully",
      data: updatedAppointment,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
const getAppointmentPatientForDoctor = async (req, res) => {
  const { userId } = req.params;
  try {
   const appointments = await Appointment.aggregate([
  {
    $match: {
      doctorId: new mongoose.Types.ObjectId(userId),
    },
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
      from: "users",
      localField: "patientId",
      foreignField: "_id",
      as: "user",
    },
  },
  {
    $lookup: {
      from: "healthtables",
      localField: "patientId",
      foreignField: "patientId",
      as: "healthtable",
    },
  },
  
  { $unwind: "$patient" },
  { $unwind: "$user" },
{
  $unwind: {
    path: "$healthtable",
    preserveNullAndEmptyArrays: true,
  },
},
  // 4️⃣ Group by patientId (THIS IS THE KEY PART)
  {
    $group: {
      _id: "$patientId",                 // ✅ correct field
      totalAppointments: { $sum: 1 },    // ✅ count per patient
      appointment: { $first: "$$ROOT" }, // keep one appointment
    },
  },

  {
    $project: {
      _id: "$appointment._id",
      patientId: "$_id",
      patientName: {
        $concat: [
          "$appointment.patient.firstName",
          " ",
          "$appointment.patient.lastName",
        ],
      },
      age:"$appointment.patient.age",
      gender:"$appointment.patient.gender",
      phone:"$appointment.patient.phone",
      place:"$appointment.patient.place",
      emergencyContactName:"$appointment.patient.emergencyContact.name",
      emergencyContactRelation:"$appointment.patient.emergencyContact.relation",
      emergencyContactPhone:"$appointment.patient.emergencyContact.phone",
      active:"$appointment.user.active",
      email:"$appointment.user.email",
      totalAppointments: 1,
      healthtable:"$appointment.healthtable._id"
    },
  },
]);


    return res.status(201).json({
      success: true,
      message: "appointments by patient ",
      data: appointments,
    });
  } catch (error) {
    console.error("Error in getting appointments:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointment,
  getAppointmentForCalanadar,
  getAppointmentForPatient,
  getAppointmentForPatientHelathBoard,
  getAppointmentForDoctor,
  doctorAddNotes,
  doctorUpdateAppointment,
  getAppointmentPatientForDoctor
};
