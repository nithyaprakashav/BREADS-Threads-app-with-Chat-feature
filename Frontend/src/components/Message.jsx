import { Avatar, Box, Flex, Image, Skeleton, Text, useColorMode } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";
import { useState } from "react";

const Message = ({userMessage, message}) => {

    const selectedConversation = useRecoilValue(selectedConversationAtom)
    const colorMode = useColorMode()
    const currUser = useRecoilValue(userAtom)
    const [imgLoaded , setImgLoaded] = useState(false)
    return ( 
        <>
        {userMessage ? (
            <Flex
            gap={2}
            alignSelf={"flex-end"}
            >  
            {message.text && (
                <Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"} >
                    <Text color={"white"} >{message.text}</Text>
                    <Box alignSelf={"flex-end"} ml={1} color={message.seen? "blue.400" : ""} fontWeight={"bold"} >
                        <BsCheck2All size={16} />
                    </Box>
                </Flex>
            )}

            {message.img && !imgLoaded && (
                <Flex mt={5} w={"200px"} >
                    <Image 
                        src={message.img}
                        alt="Image as Message"
                        borderRadius={4}
                        hidden
                        onLoad={()=>setImgLoaded(true)}
                    />
                    <Skeleton width={"200px"} height={"200px"} />
                </Flex>
            )}

            {message.img && imgLoaded && (
                <Flex mt={5} w={"200px"} >
                    <Image 
                        src={message.img}
                        alt="Image as Message"
                        borderRadius={4}
                    />
                    <Box alignSelf={"flex-end"} ml={1} color={message.seen? "blue.400" : ""} fontWeight={"bold"} >
                        <BsCheck2All size={16} />
                    </Box>
                    
                </Flex>
            )}
                
                <Avatar src={currUser.profilePic} w={7} h={7} />
            </Flex>
        ):(
            <Flex
            gap={2}
            >  
                <Avatar src={selectedConversation.userProfilePic} w={7} h={7} />

                {message.text && (
                    <Text maxW={"350px"} bg= {colorMode === "dark" ? "gray.900": "blue.100" } color={colorMode === 'dark' ? "black":""} p={1} borderRadius={"md"} >{message.text}</Text>
                )}

{message.img && !imgLoaded && (
                <Flex mt={5} w={"200px"} >
                    <Image 
                        src={message.img}
                        alt="Image as Message"
                        borderRadius={4}
                        hidden
                        onLoad={()=>setImgLoaded(true)}
                    />
                    <Skeleton width={"200px"} height={"200px"} />
                </Flex>
            )}

            {message.img && imgLoaded && (
                <Flex mt={5} w={"200px"} >
                    <Image 
                        src={message.img}
                        alt="Image as Message"
                        borderRadius={4}
                    />
                </Flex>
            )}
                
                
            </Flex>
        )}
        
        </>
     );
}
 
export default Message;
