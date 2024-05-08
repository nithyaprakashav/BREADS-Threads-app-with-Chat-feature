import { Avatar, Flex ,Text , Image , Box, Divider, Button} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Icons from "../components/Icons";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import useShowToast from "../hooks/useShowToast";


const PostPage = () => {
    
    
    

    


    return ( 
        <>
        <Flex>
            <Flex w={"full"} alignItems={"center"} gap={3} >
                <Avatar src="/np-avatar.jpg" size={"md"} name="Nithya Prakash" />
                <Flex w={"full"}  alignItems={"center"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>nithyaprakash</Text>
                    <Image src="/verified.png" w={4} h={4} ml={1}></Image>
                </Flex>
            </Flex>
            <Flex gap={4} alignItems={"center"}>
                <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
                <BsThreeDots/>
            </Flex>
        </Flex>

        <Text my={3}>Hey guys! wassup!!</Text>
        <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
        >
            <Image src="/np-avatar.jpg" w={"full"}></Image>
        </Box>

        <Flex gap={3} my={3}>
            <Icons post_={post}></Icons>
        </Flex>
        <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>304 replies</Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>{2001} likes</Text>
        </Flex>
        <Divider my={4}/>

        <Flex justifyContent={"space-between"}>
            <Flex gap={2} alignItems={"center"}>
                <Text fontSize={"2xl"}>🙌</Text>
                <Text color={"gray.light"}>Get the app to like, reply and post</Text>
            </Flex>
            <Button>GET</Button>
        </Flex>

        <Divider my={4}/>
        {/* <Comment comment={"Chill bro , my girl is on this app"} likes={192} userName={"Jiraiya"} userImage={'/Jiraiya.jpg'} createdAt={"2d"}/> */}
        </>
     );
}
 
export default PostPage;