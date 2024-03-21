import express from "express"
import dotenv from "dotenv"
import connectDB from "./mongoDB/connectDB.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
connectDB()

app.listen(3001 , () => console.log(`Server running on port ${PORT} successfully`))