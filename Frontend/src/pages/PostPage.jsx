import { Avatar, Flex ,Text , Image , Box, Divider, Button} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Icons from "../components/Icons";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import useShowToast from "../hooks/useShowToast";
import useGetUser from "../hooks/useGetUser";
import {Spinner } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import {formatDistanceToNow} from "date-fns"
import {DeleteIcon} from "@chakra-ui/icons"
import postsAtom from "../atoms/postsAtom";

const PostPage = () => {
    // const[post,setPost] = useState(null)
    const[posts,setPosts] = useRecoilState(postsAtom)
    const{user, isLoading} = useGetUser()
    const showToast = useShowToast()
    const {pid} = useParams()
    const currUser = useRecoilValue(userAtom)
    const navigate = useNavigate()
    const currPost = posts[0]

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
                
                setPosts([data])
                // console.log(posts,"This is the post")
            } catch (error) {
                showToast("Error", error.message,"error")
            }
        }
        getPost()
    },[showToast,pid,setPosts,posts])


    const handleDeletePost = async()=>{
        try {
            // console.log(pid)
            // console.log("Post.Id", post._id)
            // console.log(`/api/posts/delete/${pid}`)
            if(!window.confirm("Are ypu sure you want to delete this post?")) return
            const response = await fetch(`/api/posts/delete/${pid}`,{
                method:"DELETE"
            })
            const data = await response.json()
            if(data.error){
                showToast("Error",data.error,"error")
                return
            }
            showToast("Success","Post deleted successfully","success")
            navigate(`/${user.username}`)
            
        } catch (error) {
            showToast("Error",error.message,"error")
        }
    }
    
    if(!user && isLoading){
        return (
            <Flex justifyContent={"cenetr"} >
                <Spinner size={"xl"} />
            </Flex>
        )
    }

    if(!currPost) return null
    


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
                    {currPost.createdAt ? formatDistanceToNow(new Date(currPost.createdAt)) : 0} ago
                </Text>
                
                {currUser?.id === user._id && <DeleteIcon onClick={handleDeletePost} cursor={"pointer"} /> }
                

            </Flex>
        </Flex>

        <Text my={3}>{currPost.text}</Text>


        {currPost.img && (
            <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray.light"}
            >
                <Image src={currPost.img} w={"full"}></Image>
            </Box>
        )}
        

        <Flex gap={3} my={3}>
            <Icons post={currPost}></Icons>
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

        {currPost.comments && currPost.comments.map((comment)=>(
            <Comment key={comment._id} comment={comment} lastComment={comment._id === currPost.comments[currPost.comments.length-1]._id} />
        ))}
        
        </>
     );
}
 
export default PostPage;