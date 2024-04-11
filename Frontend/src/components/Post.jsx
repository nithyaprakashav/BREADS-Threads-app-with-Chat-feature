import { Avatar, Box, Flex ,Text} from "@chakra-ui/react";
import {Image} from "@chakra-ui/image"
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Icons from "./Icons";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import {formatDistanceToNow} from "date-fns"

const Post = ({ post , postedBy }) => {
    
    const[user , setUser] = useState(null)
    console.log(post)
    console.log(post.img)
    // console.log(user.firstname)
    const showToast = useShowToast()
    const navigate = useNavigate()

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

    if(!user) return null
    return ( 
        <Link to={`/${user.username}/post/${post._id}`}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"}
                alignItems={"center"}
                >
                    <Avatar size={"md"} name={user?.username} src={user?.profilePic} onClick={(e)=>{
                        e.preventDefault()
                        navigate(`/${user.username}`)
                    }}/>
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
                        {post.replies ? post.replies[0]: null && (
                            <Avatar  
                            size={"xs"}
                            name={post.username}
                            src={post.replies ? post.replies[0].profilePic : null}
                            position={"absolute"}
                            top={"0px"}
                            left={"20px"}
                            padding={"2px"}
                            />
                        )}
                        
                        {post.replies ? post.replies[1]: null && (
                            <Avatar  
                            size={"xs"}
                            name={post.username}
                            src={post.replies ? post.replies[0].profilePic : null}
                            position={"absolute"}
                            top={"0px"}
                            left={"-2px"}
                            padding={"2px"}
                            />
                        )}
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
                            onClick={(e)=>{
                                e.preventDefault()
                                navigate(`/${user.username}`)
                            }}
                            >
                                {`${user?.username}`}
                            </Text>
                            <Image src="/verified.png" w={4} h={4} ml={1}/>
                        </Flex>
                        <Flex gap={4} alignItems={"center"} >
                            <Text fontSize={"sm"} textAlign={"right"}
                             width={"36"} color={"gray.light"} >
                                {post.createdAt ? formatDistanceToNow(new Date(post.createdAt)) : 0} ago
                            </Text>
                            
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
                        <Icons post={post} />
                    </Flex>

                    

                </Flex>
            </Flex>
        </Link>
     );
}
 
export default Post;