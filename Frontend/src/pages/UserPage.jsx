import { useEffect, useState } from "react";
import UserNavbar from "../components/UserNavbar";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import useGetUser from "../hooks/useGetUser";

const UserPage = () => {

    const{user , isLoading} = useGetUser()
    const showToast = useShowToast()
    const {username } = useParams()
    
    const[userPosts ,setUserPosts ]  = useState([])
    const [isFetching , setIsFetching]  = useState(true)

    useEffect(() => {
        
        getUserPosts()
    },[username])


    const getUserPosts = async ()=>{
        setIsFetching(true)
        try {
            const response = await fetch(`/api/posts/user/${username}`)
            const data = await response.json()
            console.log(data)
            setUserPosts(data)
        } catch (error) {
            showToast("Error",error.message, "error")
        }finally{
            setIsFetching(false)
        }
    }



    if(!user && isLoading){
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"}  />
            </Flex>
            
        )
    }

    if(!user && !isLoading){
        return (
            <h1>User not found</h1>
        )
    }
    
    

    return ( 
        <>
            <UserNavbar user={user}/>

            {!isFetching && userPosts.length === 0 && <h1>User has no posts to display</h1>}

            {isFetching && (
                <Flex justifyContent={"center"} my={12} >
                    <Spinner size={"xl"} />
                </Flex>
            )}

            {userPosts.map((post)=>(
                <Post  key={post._id} post={post} postedBy={post.postedBy}/>
            ))}
            
        </>
     );
}
 
export default UserPage;