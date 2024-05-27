import express from "express"
import dotenv from "dotenv"
import connectDB from "./mongoDB/connectDB.js"
import cookieParser from "cookie-parser"
import userRoutes from "../Server/routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import {v2 as cloudinary} from "cloudinary"


dotenv.config()



// const cors = require("cors")



import { app, server } from "./Socket/socket.js"
import path from "path"
import job from "./cron/cron.js"
dotenv.config()
connectDB()
job.start()


const PORT = process.env.PORT || 5000
const __dirname = path.resolve()


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// ************Deployement changes******************/

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,'/Frontend/dist')))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"Frontend","dist","index.html"))
    })
}


// ************Deployement changes******************/

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//Routes

app.use("/api/users" , userRoutes)
app.use("/api/posts" , postRoutes)
app.use("/api/messages" , messageRoutes)



//http://localhost:3000 ==> frontend
//http://localhost:3001 ==> server

server.listen(PORT , () => console.log(`Server running on port ${PORT} successfully`))