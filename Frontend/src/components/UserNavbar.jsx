import { Avatar, Box,Text, Flex, VStack, Menu, MenuButton, Portal, MenuList, MenuItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {BsInstagram } from "react-icons/bs"
import {CgMoreO} from "react-icons/cg"
import { useToast } from '@chakra-ui/react'

const UserNavbar = () => {
    const toast = useToast()
    const copyUrl =() => {
        const currUrl = window.location.href
        navigator.clipboard.writeText(currUrl).then(()=>{
            
            toast({
                title: ` Profile link copied to your clipboard`,
                position: 'top-right',
                isClosable: true,
                background: "gray.dark"
              })
        })
        
    }
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
                <Flex>
                    <Box className="icon-container">
                       <BsInstagram size={24} cursor={"pointer"}/> 
                    </Box>
                    <Box className="icon-container">
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"}/> 
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>
                                    <MenuItem bg={"gray.dark"} onClick={copyUrl}>Copy Link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>   
                    </Box>


                </Flex>
            </Flex>
        </VStack>
     );
}
 
export default UserNavbar;