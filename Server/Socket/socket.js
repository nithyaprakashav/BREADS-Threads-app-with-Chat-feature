import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:['GET','POST']
    }
})
io.on('connection' , (socket) => {
    console.log("user connected is :" , socket.id)

    socket.on("disconnect", ()=>{
        console.log("user disconnected :")
    })
})

export{io, server,app}