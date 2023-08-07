import mongoose from "mongoose";

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    blogs:[{type:mongoose.Types.ObjectId,ref:"Blog",required:true}]
});

//Export the model
export default mongoose.model("User",userSchema);