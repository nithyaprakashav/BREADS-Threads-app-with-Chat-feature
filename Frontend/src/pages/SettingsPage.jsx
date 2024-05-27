import { Button, Flex, Text } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";

const SettingsPage = () => {

    const showToast = useShowToast()
    const logout = useLogout()

    const handleFreeze = async ()=> {
        const cancel = !window.confirm("Are you sure you want to freeze your account?")
        if(cancel) return;

        try {
            const response = await fetch('/api/users/freeze',{
                method:"PUT",
                headers:{"Content-Type":"application/json"}
            })
            const data = await response.json()
            if(data.error){
                showToast("Error", data.error ,"error")
                return
            }
            if(data.success){
                await logout()
                showToast("Success", "Your account has been freezed.","success")
            }
        } catch (error) {
            showToast("Error", error.message ,"error")
        }
    }

    return ( 
        <Flex flexDirection={"column"} alignItems={"center"} > 
            <Text  my={1} fontWeight={"bold"} justifyContent={"center"} >Freeze your account</Text>
            <Text my={1} >Your account gets unfreezed automatically when you log in again. </Text>
            <Button size={"sm"} colorScheme="red"
                onClick={handleFreeze}
                mt={2}
            >Freeze</Button>
        </Flex>
     );
}
 
export default SettingsPage;