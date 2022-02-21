import mongoose from "mongoose";

const db = mongoose.connection;

    db.on('error', (err) => console.log(err))
    db.on('open', () => console.log("DB connection is Succesfull"))

const connectDB = async () => {
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

export default () => {
    connectDB()
}
