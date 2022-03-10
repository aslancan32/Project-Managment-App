import mongoose from "mongoose";
import logger from "../scripts/loggar/Section.js";

const SectionSchema =  new mongoose.Schema({
    name: String,
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    project_id: {
        type: mongoose.Types.ObjectId,
        ref: "project"
    }
}, {versionKey:false, timestamps:true})

// SectionSchema.pre("save", (next) => {
//     console.log("Oncesi")
//     next()
// })

SectionSchema.post("save", (obj) => {
    // console.log("Sonrasi"+ obj)
    logger.log({
        level: "info",
        message: obj
    })
    // Save is Succesfull ... Create Log
})

export default mongoose.model("section", SectionSchema)