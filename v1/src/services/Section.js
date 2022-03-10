import Sections from "../models/Sections.js";

const insert = (data) => {
    return new Sections(data).save()
}
const list = (where) => {
    return Sections.find(where || {}).populate({
        path:"user_id",
        select: "full_name email profile_image"
    });
}

const modify =(id, data) => {
    return Sections.findByIdAndUpdate(id, data, {new: true})
}

const remove = (id) => {
    return Sections.findByIdAndDelete(id)
}
export {insert, list, modify, remove}