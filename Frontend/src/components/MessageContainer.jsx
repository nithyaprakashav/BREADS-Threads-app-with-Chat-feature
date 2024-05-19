import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from "@chakra-ui/react";
import Message from "./Message";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
    return ( 
        <Flex flex={70}
            bg={useColorModeValue("gray.200","gray.dark")}
            borderRadius={"md"}
            flexDirection={"column"}
        >
            {/* Message header */}

            <Flex w={"full"} h={12} alignItems={"center"} gap={2} ml={5} p={1} >
                <Avatar src="" size={"sm"} />
                <Text display={"flex"} alignItems={"center"} >tsunade <Image src="/verified.png" w={4} h={4} ml={1} /> </Text>
            </Flex>

            <Divider/>

            <Flex flexDir={"column"} gap={4} p={2} my={4} height={"400px"} overflowY={"auto"} >
                {true && (
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

                <Message userMessage={true} />
                <Message userMessage={false} />
                <Message userMessage={true} />
                <Message userMessage={false} />
            </Flex>

                <MessageInput/>

        </Flex>
        
     );
}
 
export default MessageContainer;
