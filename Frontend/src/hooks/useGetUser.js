import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "./useShowToast";

const useGetUser = () => {
    
    const[user , setUser] = useState(null)
    const[isLoading , setIsLoading] = useState(true)
    const{username} = useParams()
    const showToast = useShowToast()

    useEffect(()=>{

    },[username])

}
 
export default useGetUser;