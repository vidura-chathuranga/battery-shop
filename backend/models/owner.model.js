import mongoose from "mongoose";


const ownerSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    email : {
        type: String,
        required : true
    }
},{timestamps : true});

const Owner = mongoose.model("owners",ownerSchema);

export default Owner;