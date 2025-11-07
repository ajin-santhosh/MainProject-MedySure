require('dotenv').config()
const express = require('express')
const connectDB = require('./src/config/db')
const app = express()
const port = process.env.Port
connectDB()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
