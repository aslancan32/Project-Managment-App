import express from "express";
import helmet from "helmet";
import config from "./config/index.js"
const app = express()

config() 

app.use(express.json())
app.use(helmet())
// app.use()
// app.send()
app.listen(process.env.APP_PORT, () => {
    console.log(`Server running at ${process.env.APP_PORT} `);
})