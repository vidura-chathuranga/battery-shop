import mongoose from 'mongoose';

const WorkerSchema = mongoose.Schema({
    id:{
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
    }
},{timeStamps : true});


const Worker = mongoose.model("workers",WorkerSchema);

export default Worker;