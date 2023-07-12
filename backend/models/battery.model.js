import mongoose from "mongoose";

const BatterySchema = mongoose.Schema({

    stockID : {
        type : String,
        unique : true,
        required : true,
    },
    quantity : {
        type : Number,
        required : true,
    },
    addingDate : {
        type : Number,
        required : true,
    },
    warrantyPeriod : {
        type : Number,
        required : true,
    },
    sellingPrice : {
        type : String,
        required : true,

    },
    actualPrice : {
        type : String,
        required : true,

    },
    BatteryBrand : {
        type : String,
        required : true,
    },
    BatteryDescription : {
        type : String,
        required : true,
    }

},{timeStamps : true});


const Battery = mongoose.model("Battery",BatterySchema);

export default Battery;