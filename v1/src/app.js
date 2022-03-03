import express from "express";
import helmet from "helmet";
import config from "./config/index.js"
import loaders from "./loaders/index.js"
import events from './scripts/events/index.js'
import  {routerUser, routerProjects}  from "./api-routes/index.js";
const app = express()

config()
loaders()
events()
// console.log('router :>> ', routerUser,routerProjects);
app.use(express.json())
app.use(helmet())

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running at ${process.env.APP_PORT} `);
    app.use("/project", routerProjects)
    app.use("/users", routerUser)
})  