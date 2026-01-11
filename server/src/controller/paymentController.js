const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
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

module.exports = {createCheckoutSession,verifyAndSavePayment}
