const Appointment = require("../models/appointmentSchema");

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
const deleteAppointment = async (req, res) => {
  const {appointmentId} = req.params;
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

const getAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find();

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
module.exports = { createAppointment, updateAppointment, deleteAppointment,getAppointment };
