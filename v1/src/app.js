import express from "express";
import helmet from "helmet";
import config from "./config/index.js"
import  router  from "./api-routes/index.js";
const app = express()

config() 

app.use(express.json())
app.use(helmet())

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running at ${process.env.APP_PORT} `);
    app.use("/project", router)
}) 