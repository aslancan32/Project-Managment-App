import Project from "../models/Projects.js";

const insert = (projectData) => {
    const projects = new Project(projectData);
    return projects.save()
}
const list = () => {
    return Project.find({});
}

export {insert, list}