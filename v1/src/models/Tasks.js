import mongoose from "mongoose";
import logger from "../scripts/loggar/Tasks.js";

const TasksSchema =  new mongoose.Schema({
    title: String,
    description: String,

    assigned_to: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    due_date: Date,
    statuses: [String],
    section_id: {
        type: mongoose.Types.ObjectId,
        ref: "section"
    },
    project_id: {
        type: mongoose.Types.ObjectId,
        ref: "project"
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    order: Number,
    is_complated: Boolean,
    comments: [
        {
            comment:String,
            commented_at: Date,
            user_id: {
                type: mongoose.Types.ObjectId,
                ref: "user"
            }
        }
    ],
    media:[String],
    sub_tasks: [{
        type: mongoose.Types.ObjectId,
        ref: "task"
    }]
}, {versionKey:false, timestamps:true})

// TasksSchema.pre("save", (next) => {
//     console.log("Oncesi")
//     next()
// })

TasksSchema.post("save", (obj) => {
    // console.log("Sonrasi"+ obj)
    logger.log({
        level: "info",
        message: obj
    })
    // Save is Succesfull ... Create Log
})

export default mongoose.model("task", TasksSchema)