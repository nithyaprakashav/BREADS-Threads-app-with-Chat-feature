import { Avatar, AvatarBadge, Box, Flex, Image, Stack, Text, WrapItem, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from '../atoms/userAtom'
import {BsCheck2All} from 'react-icons/bs'
import { useState } from "react";
import { selectedConversationAtom } from "../atoms/messagesAtom";



const Conversations = ({conversation,isOnline}) => {

    const user = conversation?.participants[0]
    const lastMessage = conversation?.lastMessage
    const currUser = useRecoilValue(userAtom)
    const[selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom)
    const colorMode = useColorMode()
    // console.log(selectedConversation)

    return ( 
        
        <Flex
            gap={4}
            alignItems={'center'}
            p={'1'}
            _hover={{
                cursor:'pointer',
                bg:useColorModeValue("gray.600","gray.dark"),
                color:"white"
            }}
            borderRadius={"md"}
            onClick={()=> setSelectedConversation({
                _id:conversation._id,
                userId:user._id,
                userProfilePic:user.profilePic,
                username:user.username,
                temp:conversation.temp
            }) }
            bg={
                selectedConversation?._id === conversation?._id ? (colorMode === 'light' ? "blue.200" : "gray.800") :""
            }
        >
        
            {user && (
                <>
                    <WrapItem>
                        <Avatar size={{
                            base:"xs",
                            sm:"sm",
                            md:"md"
                        }} src= {user.profilePic ? user.profilePic : "https://bit.ly/broken.link" } >

                           {isOnline && <AvatarBadge boxSize={"1em"} bg="green.500" /> } 
                        </Avatar>    
                        </WrapItem>

                        <Stack direction={"column"} fontSize={"sm"} >
                        <Text fontWeight={"700"}
                            display={'flex'}
                            alignItems={"center"}
                        >
                            {user?.username} <Image src="/verified.png" w={4} h={4} ml={1} />
                        </Text>
                        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1} >
                            {currUser._id === lastMessage.sender ? 
                            (
                               <Box color={lastMessage.seen ? "blue.400" : ""} >
                                    <BsCheck2All size={16} />
                               </Box>
                            ) : ""
                        }
                            {lastMessage?.text.length > 18? lastMessage?.text.substring(0,18) + "..." : lastMessage?.text}
                        </Text>
                    </Stack>
                </>
            )}
                

            {conversation?.length === 0 && (
                <Flex>
                    <Text>Opps! You dont have any conversations yet.</Text>
                </Flex>
            )}  
            

        </Flex>
     );
}
 
export default Conversations;
