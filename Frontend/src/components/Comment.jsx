import { Avatar, Divider, Flex ,Text} from "@chakra-ui/react";
import { useState } from "react";

const Comment = ({comment,lastReply}) => {

    const [liked , setLiked ] = useState(false)
    return ( 
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar src={comment.userProfilePic} size={"sm"}></Avatar>
                <Flex gap={1} width={"full"} flexDirection={"column"} >
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>{comment.userName}</Text>
                    </Flex>
                    <Text>{comment.text}</Text>
                    
                </Flex>
            </Flex>
            {!lastReply?<Divider/>:null}  

        </>
     );
}
 
export default Comment;