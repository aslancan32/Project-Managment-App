import Project from "../models/Projects.js";
const insert = (projectData) => {
    const projects = new Project(projectData);
    return projects.save()
}
export default insert