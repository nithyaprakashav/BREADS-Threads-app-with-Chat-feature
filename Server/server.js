import express from "express"
import dotenv from "dotenv"
import connectDB from "./mongoDB/connectDB.js"
import cookieParser from "cookie-parser"
import userRoutes from "../Server/routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import {v2 as cloudinary} from "cloudinary"


dotenv.config()



// const cors = require("cors")


import cors from 'cors'
import path from 'path'
import { fileURLToPath } from "url"
dotenv.config()
// const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 5000
connectDB()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// ************Deployement changes******************/

const prodOrigins = [process.env.ORIGIN_1,process.env.ORIGIN_2]
const devOrigin = ['http://localhost:5000']
const allowedOrigins = process.env.NODE_ENV === 'production' ? prodOrigins : devOrigin

app.use(cors({
    origin:(origin,callback) => {
        if(allowedOrigins.includes(origin)){
            console.log(origin, allowedOrigins)
            callback(null , true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST' ,'PUT' ,'DELETE']
}))


// ************Deployement changes******************/

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//Routes

app.use("/api/users" , userRoutes)
app.use("/api/posts" , postRoutes)

//Using client app


app.listen(PORT , () => console.log(`Server running on port ${PORT} successfully`))