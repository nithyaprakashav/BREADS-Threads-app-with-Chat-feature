import { Avatar, Box, Flex, Image, Text, useColorMode } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";

const Message = ({userMessage, message}) => {

    const selectedConversation = useRecoilValue(selectedConversationAtom)
    const colorMode = useColorMode()
    const currUser = useRecoilValue(userAtom)
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

            {message.img && (
                <Flex mt={5} w={"200px"} >
                    <Image 
                        src="/Jiraiya.jpg"
                        alt="Image as Message"
                        borderRadius={4}
                    />
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

                {message.img && (
                    <Flex mt={5} w={"200px"} >
                        <Image 
                            src=""
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
