import { useEffect, useState } from "react";
import UserNavbar from "../components/UserNavbar";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";

const UserPage = () => {

    const [user , setUser] = useState(null)
    const showToast = useShowToast()
    const {username } = useParams()
    useEffect(() => {
        const getUser = async() => {
            try {
                const response= await fetch(`/api/users/profile/${username}`)
                const data = await response.json()
                if(data.error){
                    showToast("Error" , data.error , "error")
                    return
                }
                setUser(data)
                console.log(data)
            } catch (err) {
                showToast("Error" , err , "error")
            }
        }
        getUser()
    },[username , showToast])
    return ( 
        <>
            <UserNavbar user={username}/>

            <UserPost likes={2001} replies={304} postImg={"/np-avatar.jpg"} postTitle={"Hey guys! wassup!!"} />
            <UserPost likes={3225} replies={287} postImg={"/me-khachith-pavan.jpg"} postTitle={"Group of three!"}/>
            <UserPost likes={2431} replies={324} postImg={"/inGoa.JPG"} postTitle={"Goa!!!"} />
            
        </>
     );
}
 
export default UserPage;