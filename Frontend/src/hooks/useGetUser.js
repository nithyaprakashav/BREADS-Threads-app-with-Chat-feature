import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "./useShowToast";

const useGetUser = () => {
    
    const[user , setUser] = useState(null)
    const[isLoading , setIsLoading] = useState(true)
    const{username} = useParams()
    const showToast = useShowToast()

    useEffect(()=>{

        const getUser = async() => {
            
            try {
                const response= await fetch(`/api/users/profile/${username}`)
                const data = await response.json()
                if(data.error){
                    showToast("Error" , data.error , "error")
                    return;
                }
                if(data.isFrozen){
                    setUser(null)
                    return;
                }
                setUser(data)
                // console.log(data)
            } catch (err) {
                showToast("Error" , err.message , "error")
            }finally{
                setIsLoading(false)
            }
        }
        getUser()

    },[username,showToast])



    return {isLoading,user}
}
 
export default useGetUser;