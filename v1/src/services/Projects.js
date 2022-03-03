import Project from "../models/Projects.js";

const insert = (data) => {
    const projects = new Project(data);
    return projects.save()
}
const list = (where) => {
    return Project.find(where || {}).populate({
        path:"user_id",
        select: "full_name email"
    });
}

const modify =(id, data) => {
    return Project.findByIdAndUpdate(id, data, {new: true})
}

export {insert, list, modify}