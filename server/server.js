require('dotenv').config()
const express = require('express')
const connectDB = require('./src/config/db')
const adminRoutes = require("./src/routes/adminRoutes")
const app = express()
const port = process.env.Port
connectDB()
app.use(express.json())

app.use('/medysure/api/admin',adminRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
