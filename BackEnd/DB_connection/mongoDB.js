import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const db_connection = async(req, res) =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB connection Successfully")
    } catch (error) {
        console.log("DB connection issue")
    }
}