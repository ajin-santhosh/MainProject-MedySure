const mongoose = require("mongoose")
const healthSchema = new mongoose.Schema(
     {
        patientId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Users",
              required: true,
              index: true,
            },
            doctorId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Users",
              required: true,
              index: true,
            },
            Blood_pressure:{
                type:String,
                required:true
            },
            Heart_rate:{
                type:String,
                required:true
            },
            Body_temperature:{
                type:String,
                required:true
            },
            Respiratory_rate:{
                type:String,
                required:true
            },
            Oxygen_saturation:{
                type:String,
                required:true
            },
            Blood_sugar:{
                type:String,
                required:true
            },
            
        },
        { timestamps: true }
)
module.exports = mongoose.model("HealthTable", healthSchema);

