import mongoose from "mongoose";

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
    return console.log("Sonrasi"+ obj)
    // Save is Succesfull ... Create Log
})

export default mongoose.model("project", ProjectSchema)