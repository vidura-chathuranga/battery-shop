import mongoose from 'mongoose';

const WorkerSchema = new mongoose.Schema({
    w_id:{
        type : String,
        unique : true,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
    },
    nic : {
        type : String,
        unique : true,
        required : true,
    },
    address :{
        type : String,
        required : true,
    },
    gender :{
        type: String,
        required : true
    }
},{timeStamps : true});


const Worker = mongoose.model("workers",WorkerSchema);

export default Worker;