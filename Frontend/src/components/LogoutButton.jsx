import { Button, useToast } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const LogoutButton = () => {
    const showToast = useShowToast()
    const [user , setUser ] = useRecoilState(userAtom)
    const handleLogout = async () => {
        try {
            
            //fetch
            const response = await fetch("/api/users/logout",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
            })
            const data = await response.json()
            console.log(data)
            if(data.error){
                showToast("Error" , data.error , "error")
            }
            localStorage.removeItem("userinfo")
            console.log(localStorage.getItem("userinfo"))
            localStorage.removeItem("logininfo")
            console.log(localStorage.getItem("logininfo"))
            setUser(null)
        } catch (err) {
            showToast("Error" , err , "error")
        }
    }

    return ( 
        <Button
        position={"fixed"}
        top={"30px"}
        right={"30px"}
        size={"sm"}
        onClick={handleLogout}
        
        >
            <Link to={"/auth"}>
            <IoLogOutOutline size={20} />
            </Link>
        </Button>
     );
}
 
export default LogoutButton;