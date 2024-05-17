import { Avatar, Divider, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";

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

        </Flex>
        
     );
}
 
export default MessageContainer;
