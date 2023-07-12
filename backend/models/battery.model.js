import mongoose from "mongoose";

const batterySchema = mongoose.Schema({
    stock_id : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        default : 0,
        required : true
    },
    added_date : {
        type : Date,
        required : true
    },
    warranty : {
        type : String,
        required : true
    },
    sellingPrice : {
        type : Number,
        required : true,
    },
    actualPrice : {
        type : Number,
        required : true
    },
    batteryBrand : {
        type : String,
        required : true
    },
    batteryDescription :{
        type : String,
        required : true
    }
})