const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

 const createCheckoutSession = async (req, res) => {
  try {
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
      success_url: "http://localhost:5173/patient/payment-success",
      cancel_url: "http://localhost:5173/patient/payment-cancel",
    });

    res.json({ url: session.url })
    
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
module.exports = {createCheckoutSession}
