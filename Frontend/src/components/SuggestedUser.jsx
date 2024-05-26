import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useFollowUnfollow from "../hooks/useFollowUnfollow";

const SuggestedUser = ({user}) => {

    const {handleFollow, isFollowing , isLoading} = useFollowUnfollow(user)


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
                isLoading={isLoading}
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