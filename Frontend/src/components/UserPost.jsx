import { Avatar, Box, Flex ,Text , Image} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";


const UserPost = () => {
    return ( 
        <Link to={"/nithyaprakash/post/1"}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"}
                alignItems={"center"}
                >
                    <Avatar size={"md"} name="Nithya Prakash" src="/np-avatar.jpg" />
                    <Box 
                    width={"1px"} 
                    height={"full"} 
                    bg={"gray.light"}
                    my={2}
                    />
                    <Box
                    position={"relative"}
                    w={"full"}
                    >
                        <Avatar  
                        size={"xs"}
                        name="Naruto"
                        src="/naruto.png"
                        position={"absolute"}
                        top={"0px"}
                        left={"20px"}
                        padding={"2px"}
                        />
                        <Avatar  
                        size={"xs"}
                        name="Jiraiya"
                        src="/Jiraiya.jpg"
                        position={"absolute"}
                        top={"0px"}
                        left={"-2px"}
                        padding={"2px"}
                        />
                    </Box>
                </Flex>
                <Flex
                flex={1}
                flexDirection={"column"}
                gap={2}
                >
                    <Flex
                    justifyContent={"space-between"}
                    w={"full"}
                    >
                        <Flex w={"full"} alignItems={"center"}>
                            <Text 
                            fontSize={"sm"}
                            fontWeight={"bold"}
                            >
                                nithyaprakash
                            </Text>
                            <Image src="/verified.png" w={4} h={4} ml={1}/>
                        </Flex>
                        <Flex gap={4} alignItems={"center"} >
                            <Text fontSize={"sm"} color={"gray.light"} >1d</Text>
                            <BsThreeDots/>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Link>
     );
}
 
export default UserPost;