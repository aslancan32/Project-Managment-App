import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    full_name:{
        type:String,
        require:true
    },
    password: String,
    email: String,
    profile_image: String,
    

},{versionKey:false, timestamps:true});
export default mongoose.model("user", userSchema)
