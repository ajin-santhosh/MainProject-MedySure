const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");
const Payment = require("../models/paymentSchema");
const Appointment = require("../models/appointmentSchema");

 const createCheckoutSession = async (req, res) => {
  try {
    const { userId, appointmentId, doctorId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Demo appointment",
            },
            unit_amount: 2000, // $20
          },
          quantity: 1,
        },
      ],
       metadata: {
        patientId:userId,
        appointmentId,
        doctorId
      },
      success_url: "http://localhost:5173/patient/payment-success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/patient/payment-cancel",
    });

    res.json({ url: session.url })
    
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
const verifyAndSavePayment = async (req, res) => {
  try {
    const { sessionId } = req.body;

    // Ask Stripe if payment is real
    const session = await stripe.checkout.sessions.retrieve(sessionId);
   if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not successful" });
    }

    // ✅ PREVENT DUPLICATES
    const existingPayment = await Payment.findOne({
      paymentIntentId: session.payment_intent
    });

    if (existingPayment) {
      return res.json({ message: "Payment already saved" });
    }
      await Payment.create({
        paymentIntentId: session.payment_intent,
        sessionId: session.id,
        amount: session.amount_total / 100,
        type:"online",
        // ✅ IDS FROM STRIPE
        patientId: session.metadata.patientId,
        appointmentId: session.metadata.appointmentId,
        doctorId: session.metadata.doctorId
      });
      await Appointment.findByIdAndUpdate(
      session.metadata.appointmentId,
      { payment: true },
      { new: true }
    );

      return res.json({ message: "Payment saved" });
    


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const getPayementForPatient = async (req, res) => {
  const { userId } = req.params;
  try {
    const payments = await Payment.aggregate([
      {
        $match: { patientId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "appointments",
          localField: "appointmentId",
          foreignField: "_id",
          as: "appointment",
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
      { $unwind: "$appointment" },
      { $unwind: "$doctor" },

      {
        $project: {
          _id: 1,
          type:1,
          amount:1,
          title: "$appointment.title",
          status: "$appointment.status",
          doctorName: {
            $concat: ["$doctor.firstName", " ", "$doctor.lastName"],
          },
          doctorDepartment: "$doctor.department",
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "Asia/Kolkata", // optional
            },
          },
          time: {
            $dateToString: {
              format: "%H:%M",
              date: "$createdAt",
              timezone: "Asia/Kolkata", // optional
            },
          },
        },
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "Payments ",
      data: payments,
    });
  } catch (error) {
    console.error("Error in getting payments:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
const getPayment = async (req, res) => {
  try {
    const payments = await Payment.aggregate([
      {
        $lookup: {
          from: "appointments",
          localField: "appointmentId",
          foreignField: "_id",
          as: "appointment",
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
      { $unwind: "$appointment" },
      { $unwind: "$doctor" },

      {
        $project: {
          _id: 1,
          type:1,
          amount:1,
          title: "$appointment.title",
          status: "$appointment.status",
          doctorName: {
            $concat: ["$doctor.firstName", " ", "$doctor.lastName"],
          },
          doctorDepartment: "$doctor.department",
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "Asia/Kolkata", // optional
            },
          },
          time: {
            $dateToString: {
              format: "%H:%M",
              date: "$createdAt",
              timezone: "Asia/Kolkata", // optional
            },
          },
        },
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "Payments ",
      data: payments,
    });
  } catch (error) {
    console.error("Error in getting payments:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
const deletePayment = async (req, res) => {
  const { paymentId } = req.params;
  try {
    const deletedPayment = await Payment.findByIdAndDelete(
      paymentId
    );
    if (!deletedPayment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }
    return res.status(201).json({
      success: true,
      message: "Payment deleted successfully",
      data: deletedPayment,
    });
  } catch (error) {
    console.error("Error deleting payment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {createCheckoutSession,verifyAndSavePayment,getPayementForPatient,getPayment,deletePayment}
