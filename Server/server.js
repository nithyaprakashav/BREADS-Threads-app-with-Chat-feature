import express from "express"
import dotenv from "dotenv"
import connectDB from "./mongoDB/connectDB.js"
import cookieParser from "cookie-parser"
import userRoutes from "../Server/routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import {v2 as cloudinary} from "cloudinary"
import path from 'path'
import { fileURLToPath } from "url"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


connectDB()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



//Using client app
app.use(express.static(path.join(__dirname,'/client/dist')))

//render client for any path
app.get('*', (req,res)=> res.sendFile(path.join(__dirname,'/client/dist/index.html')))

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//Routes

app.use("/api/users" , userRoutes)
app.use("/api/posts" , postRoutes)

app.listen(PORT , () => console.log(`Server running on port ${PORT} successfully`))