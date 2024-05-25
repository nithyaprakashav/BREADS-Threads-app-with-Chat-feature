import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { useEffect, useRef, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { conversationsAtom, selectedConversationAtom } from "../atoms/messagesAtom"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useSocket } from "../context/SocketContext";


const MessageContainer = () => {

    const currUser = useRecoilValue(userAtom)
    const showToast = useShowToast()
    const[selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom)
    const[isLoading ,setIsLoading] = useState(true)
    const[message , setMessage] = useState([])
    const setConversations = useSetRecoilState(conversationsAtom)
    const {socket} = useSocket()
    const latestMessageRef = useRef(null)

    useEffect(()=>{
        socket.on("newMessage",(message) => {
            
            if(selectedConversation._id === message.conversationId){
                setMessage( prevMessage => [...prevMessage, message])
            }

            setConversations( prevConvos => {
                const updatedConversations = prevConvos.map((convo)=>{
                    if(convo._id === message.conversationId){
                        return {
                            ...convo,
                            lastMessage:{
                                text:message.text,
                                sender: message.sender
                            }
                        }
                    }
                    return convo;
                })
                return updatedConversations;
            })
        })

        return () => socket.off("newMessage")
    },[socket])

    useEffect(()=>{
        const getMessages = async ()=>{
            setIsLoading(true)
            setMessage([])
            try {
                if(selectedConversation.temp) return;
                const response = await fetch(`/api/messages/${selectedConversation.userId}`)
                const data = await response.json()
                if(data.error){
                    showToast("Error",data.error,'error')  
                    return
                }
                console.log("selectedUserId :",selectedConversation.userId)
                
                setMessage(data)
                
                
            } catch (error) {
                showToast("Error",error.message,'error')
            }finally{
                setIsLoading(false)
            }
        }
        getMessages()
    },[showToast,selectedConversation.userId])

    useEffect(()=>{
        latestMessageRef.current?.scrollIntoView({behaviour:"smooth"})
    },[message])


    return ( 
        <Flex flex={70}
            bg={useColorModeValue("gray.200","gray.dark")}
            borderRadius={"md"}
            flexDirection={"column"}
        >
            {/* Message header */}

            <Flex w={"full"} h={12} alignItems={"center"} gap={2} ml={5} p={1} >
                <Avatar src={selectedConversation.userProfilePic} size={"sm"} />
                <Text display={"flex"} alignItems={"center"} >{selectedConversation.username} <Image src="/verified.png" w={4} h={4} ml={1} /> </Text>
            </Flex>

            <Divider/>

            

            <Flex flexDir={"column"} gap={4} p={2} my={4} height={"400px"} overflowY={"auto"} >
                {isLoading && (
                    [0,1,2,3,4].map((_,i)=>(
                        <Flex key={i} gap={2} alignItems={"center"} p={1} borderRadius={"md"} alignSelf={i % 2 == 0 ? "flex-start" : "flex-end"}>
                            {i % 2 == 0 && (
                                <SkeletonCircle size={7} />
                            )}
                            <Flex flexDirection={"column"} gap={2} >
                                <Skeleton h={"8px"} w={"250px"} />
                                <Skeleton h={"8px"} w={"250px"} />
                                <Skeleton h={"8px"} w={"250px"} />
                            </Flex>
                            {i % 2 !== 0 && (
                                <SkeletonCircle size={7} />
                            )}
                        </Flex>
                    ))
                )}

                {!isLoading && (
                    message.map((msg)=>(
                        <Flex key={msg._id }direction={"column"}
                            ref={message.length -1 === message.indexOf(msg) ? latestMessageRef : null}
                        >
                            <Message  message={msg} userMessage={msg.sender === currUser._id } />
                        </Flex>
                    ))
                )}

                
            </Flex>

                <MessageInput setMessage={setMessage} />

        </Flex>
        
     );
}
 
export default MessageContainer;
