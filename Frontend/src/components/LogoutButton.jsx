import { Button, useToast } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";

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
            setUser(null)
        } catch (err) {
            console.log(err)
        }
    }

    return ( 
        <Button
        position={"fixed"}
        top={"30px"}
        right={"30px"}
        size={"sm"}
        onClick={handleLogout}
        >Logout</Button>
     );
}
 
export default LogoutButton;