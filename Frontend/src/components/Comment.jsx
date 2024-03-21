import { Avatar, Divider, Flex ,Text} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Icons from "./Icons";
import { useState } from "react";

const Comment = ({comment , likes , userName , createdAt , userImage}) => {

    const [liked , setLiked ] = useState(false)
    return ( 
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar src={userImage} size={"sm"}></Avatar>
                <Flex gap={1} width={"full"} flexDirection={"column"} >
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>{userName}</Text>
                        <Flex gap={2} alignItems={"center"}>
                            <Text fontSize={"small"} color={"gray.light"}>{createdAt}</Text>
                            <BsThreeDots/>
                        </Flex>
                    </Flex>
                    <Text>{comment}</Text>
                    <Icons liked={liked} setLiked={setLiked}/>
                    <Text fontSize={"sm"} color={"gray.light"}>
                        {likes + (liked ? 1 : 0)} likes
                    </Text>
                </Flex>
            </Flex>
            <Divider/>

        </>
     );
}
 
export default Comment;