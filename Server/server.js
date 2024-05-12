import express from "express"
import dotenv from "dotenv"
import connectDB from "./mongoDB/connectDB.js"
import cookieParser from "cookie-parser"
import userRoutes from "../Server/routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import {v2 as cloudinary} from "cloudinary"
<<<<<<< HEAD

dotenv.config()
<<<<<<< HEAD
<<<<<<< HEAD

=======
// const cors = require("cors")
>>>>>>> parent of 8102e0d (step 2)
=======
const cors = require("cors")
>>>>>>> parent of db5f90d (changes for deploy on render)
=======
import path from 'path'
import { fileURLToPath } from "url"
dotenv.config()
// const cors = require("cors")
>>>>>>> parent of 8e5ec4c (final try render)
const app = express()
const PORT = process.env.PORT || 5000
connectDB()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
// app.use(cors(
//     {
//         origin:["https://breads-threads-app-with-chat-feature-frontend.vercel.app"],
//         methods:["POST","GET","PUT","DELETE","PATCH"],
//         credentials:true
//     }
// ))
>>>>>>> parent of 8e5ec4c (final try render)


=======
// app.use(cors(
//     {
//         origin:["https://breads-threads-app-with-chat-feature-frontend.vercel.app"],
//         methods:["POST","GET"],
//         credentials:true
//     }
// ))
>>>>>>> parent of 8102e0d (step 2)
=======
app.use(cors(
    {
        origin:["https://breads-threads-app-with-chat-feature-frontend.vercel.app"],
        methods:["POST","GET"],
        credentials:true
    }
))
>>>>>>> parent of db5f90d (changes for deploy on render)

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//Routes

app.use("/api/users" , userRoutes)
app.use("/api/posts" , postRoutes)

//Using client app
app.use(express.static(path.join(__dirname,'/client/dist')))

//render client for any path
app.get('*', (req,res)=> res.sendFile(path.join(__dirname,'/client/dist/index.html')))

app.listen(PORT , () => console.log(`Server running on port ${PORT} successfully`))