import mongoose from "mongoose";

const ProjectSchema =  new mongoose.Schema({
    name: String,
    // user_id: {
    //     type: mongoose.Types.ObjectId,
    //     ref: user_id
    // },
}, {versionKey:false, timestamps:true})

export default mongoose.model("project", ProjectSchema)