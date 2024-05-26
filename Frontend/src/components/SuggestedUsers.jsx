import { Box, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SuggestedUser from "./SuggestedUser";
import useShowToast from "../hooks/useShowToast.js";

const SuggestedUsers = () => {

    const[isLoading,setIsLoading] = useState(true)
    const [suggestedUsers,setSuggestedUsers] = useState([])
    const showToast = useShowToast()


    useEffect(()=>{
        const getSuggestedUsers = async ()=>{
            setIsLoading(true)
            try {
                const response = await fetch("/api/users/suggested")
                const data = await response.json()
                if(data.error){
                    showToast("Error",error.message,"error")
                    return;
                }
                setSuggestedUsers(data)
                
            } catch (error) {
                showToast("Error",error.message,"error")
            }finally{
                setIsLoading(false)
            }
        }
        getSuggestedUsers()
    },[showToast])

    return ( 
        <>
            <Text mb={4} fontWeight={"bold"} >
                People you may know
            </Text>
            <Flex direction={"column"} gap={4} >

                {isLoading && [0,1,2,3,4].map((_,index)=>(
                    <Flex key={index} gap={2} alignItems={"center"} p={1} borderRadius={"md"} >
                        <Box>
                            <SkeletonCircle size={10} />
                        </Box>

                        <Flex w={"full"} flexDirection={"column"} gap={2} >
                            <Skeleton h={"8px"} w={"80px"} />
                            <Skeleton h={"8px"} w={"80px"} />
                        </Flex>

                        <Flex>
                            <Skeleton h={"20px"} w={"60px"} />
                        </Flex>
                    </Flex>
                ))}


                {!isLoading && suggestedUsers.map((user)=> <SuggestedUser key={user._id} user={user} />)}
            </Flex>
        </>
     );
}
 
export default SuggestedUsers;
