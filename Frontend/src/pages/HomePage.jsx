import { Box, Button , Flex, Spinner,} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import SuggestedUsers from "../components/SuggestedUsers";

const HomePage = () => {
    const showToast = useShowToast()
    // const[posts , setPosts] = useState([])
    const[posts,setPosts] = useRecoilState(postsAtom)
    const [isLoading , setIsLoading] = useState(true)
    
    useEffect(()=>{
        const getFeedPosts = async () => {
            // setIsLoading(true)
            try {
                const response = await fetch("/api/posts/feed")
                const data = await response.json()
                if(data.error){
                    showToast("Error" , data.error , "error")
                    return
                }
                // console.log(data)
                setPosts(data)
            } catch (error) {
                showToast("Error" , error.message , "error")
            }finally{
                setIsLoading(false)
            }
        }
        getFeedPosts()
    },[showToast,setPosts,posts])



    return ( 
        <Flex gap={10} alignItems={"flex-start"} >
            <Box flex={70} >
                {isLoading && (
                    <Flex justify={"center"} >
                        <Spinner size={"xl"} />
                    </Flex>
                )}

                {!isLoading && posts.length === 0 && <h1>Oops! You donot follow anyone</h1> }

                {posts.map((post)=>(
                    <Post key={post._id} post={post} postedBy={post.postedBy} />
                ))}
            </Box>

            <Box flex={30}  >
                <SuggestedUsers/>
            </Box>
        </Flex>
     );
}
 
export default HomePage;