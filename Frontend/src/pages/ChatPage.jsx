import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
import Conversations from "../components/Conversations";
import MessageContainer from "../components/MessageContainer";
import { useEffect, useState } from "react";
import useShowToast from '../hooks/useShowToast.js'
import { conversationsAtom, selectedConversationAtom } from "../atoms/messagesAtom.js";
import { useRecoilState, useRecoilValue } from "recoil";

import {GiConversation} from "react-icons/gi"
import userAtom from "../atoms/userAtom.js";
import { useSocket } from "../context/SocketContext.jsx";


const ChatPage = () => {

    const showToast = useShowToast()
    const currUser = useRecoilValue(userAtom)
    const [isLoading ,setIsLoading] = useState(true)
    const [conversations , setConversations] = useRecoilState(conversationsAtom)
    const[selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom)
    const[searchText, setSearchText] = useState('')
    const[loadingSearch , setLoadingSearch] = useState(false)
    const{socket,onlineUsers} = useSocket()


    useEffect(()=>{
        socket?.on("messagesSeen",({conversationId})=>{
            setConversations((prev)=>{
                const updatedConversations = prev.map((convo)=>{
                    if(convo._id === conversationId){
                        return {
                            ...convo,
                            lastMessage:{
                                ...convo.lastMessage,
                                seen:true
                            }
                        }
                    }
                    return convo;
                })
                return updatedConversations;
            })
        })
    },[socket,setConversations])

    useEffect(()=>{
        const getConversations = async ()=>{
            try {
                const response = await fetch("/api/messages/conversations",{
                    method:"GET"
                })
                const data = await response.json()
                if(data.error){
                    showToast("Error",data.error,"error")
                    return
                }
                setConversations(data)

            } catch (error) {
                showToast("Error",error.message,"error")
            }finally{
                setIsLoading(false)
            }
        }
        getConversations();

    },[showToast,setConversations])


    const handleSearch = async(e)=>{
        e.preventDefault();
        setLoadingSearch(true)
        try {
            const response = await fetch(`/api/users/profile/${searchText}`)
            const searchedUser = await response.json()
            if(searchedUser.error){
                showToast("Error",searchedUser.error,"error")
                return;
            }

            const textingYourself = searchedUser._id === currUser._id
            if(textingYourself){
                showToast("Error","Sorry, you cannot message yourself.","error")
                return;
            }

            const existingConversation = conversations.find(conversation => conversation.participants[0]._id === searchedUser._id)
            if(existingConversation){
                setSelectedConversation({
                    _id: existingConversation._id,
                    userId:searchedUser._id,
                    username:searchedUser.username,
                    userProfilePic:searchedUser.profilePic
                })
                return;
            }

            const tempConversation = {
                temp:true,
                lastMessage:{
                    text:"",
                    sender:""
                },
                _id:Date.now(),
                participants:[
                    {
                        _id:searchedUser._id,
                        username: searchedUser.username,
                        profilePic:searchedUser.profilePic
                    }
                ]
            }

            setConversations(prevConversations => [...prevConversations,tempConversation] )

        } catch (error) {
            showToast("Error",error.message,"error")
        }finally{
            setLoadingSearch(false)
        }
    }


    return ( 

        
        <Box position={"absolute"}
            left={"50%"}
            transform={"translateX(-50%)"}
            width={{
                base:"100%",
                md:"80%",
                lg:"750px",
            }}
            p={4}
            
        >
            <Flex
                gap={4}
                flexDirection={{
                    base:"column",
                    md:"row"
                }}
                maxW={{
                    sm:"400px",
                    md:"full"
                }}
                mx={"auto"}
            >
                <Flex flex={30}
                    gap={2}
                    flexDirection={"column"}
                    maxW={{
                        sm:"250px",
                        md:"full"
                    }}
                    mx={"auto"}
                >
                    <Text
                        fontWeight={700}
                        color={useColorModeValue("gray.600","gray.400")}
                    >
                        Your conversations
                    </Text>
                    <form onSubmit={handleSearch} >
                        <Flex alignItems={"center"}
                            gap={2}
                        >
                            <Input placeholder="Search username" onChange={(e)=> setSearchText(e.target.value)} value={searchText} />
                            <Button size={'sm'} w={18} h={10} onClick={handleSearch} cursor={"pointer"} isLoading={loadingSearch} >
                                <SearchIcon/>
                            </Button>
                        </Flex>
                    </form>

                    {isLoading && (
                        [0,1,2,3,4].map((_,i)=>(
                            <Flex key={i} gap={4} alignItems={"center"} borderRadius={"md"} >
                                <Box>
                                    <SkeletonCircle size={10} />
                                </Box>
                                <Flex w={"full"} flexDirection={"column"} gap={3} >
                                    <Skeleton h={"10px"} w={"80px"} />
                                    <Skeleton h={"8px"} w={"90%"} />
                                </Flex>
                            </Flex>
                        ))
                    )}

                    {!isLoading && (
                        conversations.map((convo)=>(    
                        <Conversations key={convo._id} isOnline={onlineUsers.includes(convo.participants[0]._id)} conversation={convo} />
                        ))
                    )}
                    <Conversations/>
                    
                    

                </Flex>

                {!selectedConversation._id && (
                    <Flex
                    flex={70}
                    borderRadius={"md"}
                    p={2}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    height={"400px"}
                >
                    <GiConversation size={100} />
                    <Text fontSize={20} >Select a conversation to start messaging</Text>
                </Flex>
                )}

                {selectedConversation._id && <MessageContainer/> }

                
            </Flex>
        </Box>
     );
}
 
export default ChatPage;
