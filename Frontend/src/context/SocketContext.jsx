import { createContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import io from 'socket.io-client'
import userAtom from "../atoms/userAtom";
const SocketContext = createContext()

export const SocketContextProvider = ({children}) => {

    const [socket , setSocket] = useState(null)
    const user = useRecoilValue(userAtom)

    useEffect(()=>{
        const socket = io('http://localhost:3001',{
            query:{
                userId:user?._id
            }
        })
        setSocket(socket)

        return () => socket && socket.close()

    },[socket,user?._id])

    return (
        <SocketContext.Provider value={"hello"} >
            {children}
        </SocketContext.Provider>
    )
}