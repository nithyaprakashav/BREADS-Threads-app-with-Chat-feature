import { Avatar, Flex ,Text , Image , Box, Divider, Button} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Icons from "../components/Icons";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import useShowToast from "../hooks/useShowToast";
import useGetUser from "../hooks/useGetUser";
import {Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import {formatDistanceToNow} from "date-fns"
import {DeleteIcon} from "@chakra-ui/icons"

const PostPage = () => {
    const[post,setPost] = useState(null)
    const{user, isLoading} = useGetUser()
    const showToast = useShowToast()
    const {pid} = useParams()
    const currUser = useRecoilValue(userAtom)

    useEffect(()=>{
        const getPost = async ()=>{
            try {
                const response = await fetch(`/api/posts/${pid}`)
                const data = await response.json()
                if(data.error){
                    showToast("Error", data.error,"error")
                    return
                }
                console.log(data)
                setPost(data)
            } catch (error) {
                showToast("Error", error.message,"error")
            }
        }
        getPost()
    },[showToast,pid])


    const handleDeletePost = async()=>{
        
    }
    
    if(!user && isLoading){
        return (
            <Flex justifyContent={"cenetr"} >
                <Spinner size={"xl"} />
            </Flex>
        )
    }

    if(!post) return null
    


    return ( 
        <>
        <Flex>
            <Flex w={"full"} alignItems={"center"} gap={3} >
                <Avatar src={user.profilePic} size={"md"} name="Nithya Prakash" />
                <Flex w={"full"}  alignItems={"center"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>{user.username}</Text>
                    <Image src="/verified.png" w={4} h={4} ml={1}></Image>
                </Flex>
            </Flex>
            <Flex gap={4} alignItems={"center"} >
                <Text fontSize={"sm"} textAlign={"right"}
                    width={"36"} color={"gray.light"} >
                    {post.createdAt ? formatDistanceToNow(new Date(post.createdAt)) : 0} ago
                </Text>
                
                {currUser?.id === user._id && <DeleteIcon onClick={handleDeletePost}/> }
                

            </Flex>
        </Flex>

        <Text my={3}>{post.text}</Text>


        {post.img && (
            <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray.light"}
            >
                <Image src={post.img} w={"full"}></Image>
            </Box>
        )}
        

        <Flex gap={3} my={3}>
            <Icons post_={post}></Icons>
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