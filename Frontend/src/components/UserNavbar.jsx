import { Avatar, Box,Text, Flex, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const UserNavbar = () => {
    return ( 
        <VStack
        gap={4}
        alignItems={"start"}
        >
            <Flex justifyContent={"space-between"}
            w={"full"}
            >
                <Box>
                    <Text
                    fontSize={"2xl"}
                    >
                        Nithya Prakash
                    </Text>
                    <Flex gap={2} alignItems={"center"} >
                        <Text fontSize={"sm"} fontWeight={"bold"}>nithyaprakash</Text>
                        <Text fontSize={"xs"} 
                        bg={"gray.dark"}
                        color={"gray.light"}
                        p={1}
                        borderRadius={"full"}
                        >
                            breads.net
                        </Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar
                    name="NithyaPrakash"
                    src="/np-avatar.jpg"
                    size={"xl"}
                    ></Avatar>
                </Box>
            </Flex>
            <Text>MERN Stack developer looking for opportunities to work</Text>
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>4.5k followers</Text>
                    <Box 
                    width={1}
                    height={1}
                    background={"gray.light"} 
                    borderRadius={"full"}>

                    </Box>
                    <Link color="gray.light">instagram.com</Link>
                </Flex>
                <Flex></Flex>
            </Flex>
        </VStack>
     );
}
 
export default UserNavbar;