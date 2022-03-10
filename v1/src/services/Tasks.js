import Tasks from "../models/Tasks.js";

const findOne = (where, populate) => {
    if (!populate) return Tasks.findOne(where)
    return Tasks.findOne(where).populate({
        path:"user_id",
        select: "full_name email profile_image"
    }).populate({
        path: "sub_tasks",
        select:"title description is_complated assigned_to sub_tasks"
    }).populate({
        path: "comments",
        populate: {
            path:"user_id",
            select: "full_name email profile_image"
        }
    }).populate({
        path: "assigned_to",
        select: "full_name email profile_image"
    })
}

const insert = (data) => {
    return new Tasks(data).save()
}
const list = (where) => {
    return Tasks.find(where || {}).populate({
        path:"user_id",
        select: "full_name email profile_image"
    });
}

const modify =(id, data) => {
    return Tasks.findByIdAndUpdate(id, data, {new: true})
}

const remove = (id) => {
    return Tasks.findByIdAndDelete(id)
}
export {insert, list, modify, remove, findOne}