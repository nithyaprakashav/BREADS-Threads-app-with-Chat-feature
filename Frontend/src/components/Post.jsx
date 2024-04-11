import { Avatar, Box, Flex ,Text} from "@chakra-ui/react";
import {Image} from "@chakra-ui/image"
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Icons from "./Icons";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";

const Post = ({ post , postedBy }) => {
    const [liked , setLiked] = useState(false)
    const[user , setUser] = useState(null)
    console.log(post)
    console.log(post.img)
    // console.log(user.firstname)
    const showToast = useShowToast()

    useEffect(()=>{
        const fetchUserInfo = async () => {
            try {
                const response = await fetch(`/api/users/profile/${postedBy}`)
                const data = await response.json()
                console.log(data)
                if(data.error){
                    showToast("Error" , data.error , "error")
                    return
                }
                setUser(data)
            } catch (error) {
                showToast("Error" , error.message , "error")
                setUser(null)
            }
        }

        fetchUserInfo()
    },[postedBy , showToast])


    return ( 
        <Link to={"/nithyaprakash/post/1"}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"}
                alignItems={"center"}
                >
                    <Avatar size={"md"} name='' src={user?.profilePic} />
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
                                {`${user?.username}`}
                            </Text>
                            <Image src="/verified.png" w={4} h={4} ml={1}/>
                        </Flex>
                        <Flex gap={4} alignItems={"center"} >
                            <Text fontSize={"sm"} color={"gray.light"} >1d</Text>
                            <BsThreeDots/>
                        </Flex>
                    </Flex>

                    <Text fontSize={"sm"}>{post.text}</Text>
                    {post.img && (<Box
                    borderRadius={6}
                    overflow={"hidden"}
                    border={"1px solid"}
                    borderColor={"gray.light"}
                    >
                        <Image src={post.img} w={"full"}></Image>
                    </Box>)}
                    <Flex
                    gap={3}
                    my={1}
                    >
                        <Icons liked={liked} setLiked={setLiked} />
                    </Flex>

                    <Flex gap={2} alignItems={"center"}>
                        <Text color={"gray.light"} fontSize={"sm"}>{post.replies ? post.replies.length : 0} replies</Text>
                        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"} fontSize={"sm"} ></Box>
                        <Text color={"gray.light"} fontSize={"sm"}>{post.likes ? post.likes.length : 0} likes</Text>
                    </Flex>

                </Flex>
            </Flex>
        </Link>
     );
}
 
export default Post;