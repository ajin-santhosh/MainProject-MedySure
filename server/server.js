require('dotenv').config()
const cookieParser = require("cookie-parser");
const express = require('express')
const cors = require('cors')
const connectDB = require('./src/config/db')
const errorHandler = require("./src/middleware/errorHandler")
const adminRoutes = require("./src/routes/adminRoutes")
const doctorRoutes = require("./src/routes/doctorRoutes")
const patientRoutes = require("./src/routes/patientRoutes")
const loginRoutes = require("./src/routes/loginRoutes")
const appointmentRoutes = require("./src/routes/appointmentRoutes")
const feedbackRoutes = require("./src/routes/feedbackRoutes")
const reportRoutes = require("./src/routes/reportRoutes")
const dashBoardRoutes = require("./src/routes/dashBoardRoutes")
const healthTableRoutes = require("./src/routes/healthTableRoutes")
const paymentRoutes = require("./src/routes/paymentRoutes")
const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = [
  "https://medy-sure.vercel.app",
  "http://localhost:5173",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
/* ========================================================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/medysure/api/admin',adminRoutes)
app.use('/medysure/api/doctor',doctorRoutes)
app.use('/medysure/api/patient',patientRoutes)
app.use('/medysure/api',loginRoutes)
app.use('/medysure/api/appointment',appointmentRoutes)
app.use('/medysure/api/feedback',feedbackRoutes)
app.use('/medysure/api/report',reportRoutes)
app.use('/medysure/api/dashboard',dashBoardRoutes)
app.use('/medysure/api/health',healthTableRoutes)
app.use('/medysure/api/payment',paymentRoutes)

// app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
