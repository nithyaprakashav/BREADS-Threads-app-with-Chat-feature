import { useState } from "react"
import useShowToast from "./useShowToast"
import { useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"



const useFollowUnfollow = (user) => {

    
    const [isLoading , setIsLoading] = useState(false)
    const showToast = useShowToast()
    const currUser = useRecoilValue(userAtom)
    const [isFollowing , setIsFollowing] = useState(user.followers?.includes(currUser._id))

    const handleFollow = async () => {
        if(!currUser){
            showToast("Error" ,"You need to be logged in to follow/Unfollow","error")
            return
        }
        // console.log(currUser.id , user._id)
        setIsLoading(true)
        try { 
            const response = await fetch(`api/users/follow/${user._id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await response.json()
            if(data.error){
                showToast("Error" , data.error , "error")
                return
            }
            console.log(data)
            
            if(isFollowing){
                showToast("Success" , `Unfollowed ${user.firstname} ${user.lastname}`,"success")
                user.followers.pop()
            }else{
                showToast("Success" , `Followed ${user.firstname} ${user.lastname}`,"success")
                user.followers.push(currUser?.id)
            }

            setIsFollowing(!isFollowing)

        } catch (err) {
            showToast("Error" , err , "error")
        }finally{
            setIsLoading(false)
        }
    }

    return {handleFollow, isLoading , isFollowing}
}
 
export default useFollowUnfollow;