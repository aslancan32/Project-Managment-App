import mongoose from "mongoose";
import logger from "../scripts/loggar/Projects.js";

const ProjectSchema =  new mongoose.Schema({
    name: String,
    // user_id: {
    //     type: mongoose.Types.ObjectId,
    //     ref: user_id
    // },
}, {versionKey:false, timestamps:true})

// ProjectSchema.pre("save", (next) => {
//     console.log("Oncesi")
//     next()
// })

ProjectSchema.post("save", (obj) => {
    // console.log("Sonrasi"+ obj)
    logger.log({
        level: "info",
        message: obj
    })
    // Save is Succesfull ... Create Log
})

export default mongoose.model("project", ProjectSchema)