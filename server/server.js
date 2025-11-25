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
const app = express()
const port = process.env.Port
connectDB()
app.use(cors({
  origin: "http://localhost:5173",   // correct spelling
  credentials: true
}));app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/medysure/api/admin',adminRoutes)
app.use('/medysure/api/doctor',doctorRoutes)
app.use('/medysure/api/patient',patientRoutes)
app.use('/medysure/api',loginRoutes)
app.use('/medysure/api/appointment',appointmentRoutes)
app.use('/medysure/api/feedback',feedbackRoutes)
app.use('/medysure/api/report',reportRoutes)
// app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
