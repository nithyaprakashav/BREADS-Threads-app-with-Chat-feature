import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SuggestedUser = ({user}) => {

    const [isFollowing , setIsFollowing] = useState(true)
    const [isUpdating , setIsUpdating] = useState(false)

    const handleFollow = async ()=>{
        try {
            
        } catch (error) {
            
        }
    }


    return ( 
        <Flex gap={2} justifyContent={"space-between"} alignItems={"center"} >
            
            <Flex gap={2} as={Link} to={`${user.username}`} >
                <Avatar src={user.profilePic} />
                <Box>
                    <Text fontSize={"sm"} fontWeight={"bold"} >
                        {user.username}
                    </Text>
                    <Text color={"gray.light"} fontSize={"sm"} >
                        {user.firstname} {user.lastname}
                    </Text>
                </Box>
            </Flex>

            <Button 
                size={"sm"}
                color={isFollowing? "black" : "white"}
                bg={isFollowing? "white" : "blue.400"}
                onClick={handleFollow}
                isLoading={isUpdating}
                _hover={{
                    color: isFollowing? "black" : "white",
                    opacity: "0.8"
                }}
            >
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>


        </Flex>
     );
}
 
export default SuggestedUser;