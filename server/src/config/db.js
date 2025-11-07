const mongoose = require('mongoose')
const connectDB = async () => {
    try{
       await mongoose.connect(process.env.Mongo_URL,{
        useNewUrlParser: true,
      useUnifiedTopology: true
       })
       console.log("mongo db connected")

    }
    catch(error){
         console.log("db connection failed",error.message)
         process.exit(1)
    }
}
module.exports = connectDB