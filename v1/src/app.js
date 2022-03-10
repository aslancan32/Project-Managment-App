import express from "express";
import FileUpload from 'express-fileupload'
import helmet from "helmet";
import config from "./config/index.js"
import loaders from "./loaders/index.js"
import events from './scripts/events/index.js'
import { fileURLToPath } from 'url'
import  {routerUser, routerProjects, routerSection, routerTasks}  from "./api-routes/index.js";
import path from "path";


const app = express()

config()
loaders()
events()
console.log('Public Path :>> ', path.join(path.dirname(fileURLToPath(import.meta.url)), "./" , "uploads"));
// console.log('router :>> ', routerUser,routerProjects);,
app.use("/uploads", express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), "./" , "uploads")))
app.use(express.json())
app.use(helmet())
app.use(FileUpload())

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running at ${process.env.APP_PORT} `);
    app.use("/project", routerProjects)
    app.use("/users", routerUser)
    app.use("/sections", routerSection)
    app.use("/tasks", routerTasks)
})  