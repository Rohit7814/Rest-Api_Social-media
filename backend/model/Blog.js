import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
   title:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:true,
   },
   image:{
    type:String,
    require:true,
   },
   user:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:true,
   },

});

//Export the model

export default mongoose.model("blog",blogSchema);