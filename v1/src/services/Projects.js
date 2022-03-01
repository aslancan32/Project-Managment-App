import Project from "../models/Projects.js";

const insert = (data) => {
    const projects = new Project(data);
    return projects.save()
}
const list = () => {
    return Project.find({});
}

export {insert, list}