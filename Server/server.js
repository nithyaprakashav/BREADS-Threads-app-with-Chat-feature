import express from "express"
import dotenv from "dotenv"
import connectDB from "./mongoDB/connectDB.js"
import cookieParser from "cookie-parser"
import userRoutes from "../Server/routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import {v2 as cloudinary} from "cloudinary"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000
connectDB()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//Routes

app.use("/api/users" , userRoutes)
app.use("/api/posts" , postRoutes)

app.listen(3001 , () => console.log(`Server running on port ${PORT} successfully`))