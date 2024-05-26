import { Box, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { useState } from "react";
import SuggestedUser from "./SuggestedUser";

const SuggestedUsers = () => {

    const[isLoading,setIsLoading] = useState(true)
    const [suggestedUsers,setSuggestedUsers] = useState([])


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
