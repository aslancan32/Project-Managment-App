import Project from "../models/Projects.js";

const insert = (data) => {
    const projects = new Project(data);
    return projects.save()
}
const list = (where) => {
    return Project.find(where || {}).populate({
        path:"user_id",
        select: "full_name email profile_image"
    });
}

const modify =(id, data) => {
    return Project.findByIdAndUpdate(id, data, {new: true})
}

const remove = (id) => {
    return Project.findByIdAndDelete(id)
}
export {insert, list, modify, remove}