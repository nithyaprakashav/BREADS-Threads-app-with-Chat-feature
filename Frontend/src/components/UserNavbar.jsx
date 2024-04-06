import { Avatar, Box,Text, Flex, VStack, Menu, MenuButton, Portal, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {BsInstagram } from "react-icons/bs"
import {CgMoreO} from "react-icons/cg"
import { useToast } from '@chakra-ui/react'
import {useRecoilValue} from "recoil"
import userAtom from "../atoms/userAtom"


const UserNavbar = ({user}) => {
    const toast = useToast()
    const currUser = useRecoilValue(userAtom)
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
                        {user.firstname} {user.lastname}
                    </Text>
                    <Flex gap={2} alignItems={"center"} >
                        <Text fontSize={"sm"} fontWeight={"bold"}>{user.username}</Text>
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
                    {user.profilePic && (
                        <Avatar
                        name={user.username}
                        src={user.profilePic}
                        size={"xl"}
                        ></Avatar>
                    )
                    }
                    {!user.profilePic && (
                        <Avatar
                        name={user.username}
                        src="https://bit.ly/broken-link"
                        size={"xl"}
                        ></Avatar>
                    )
                    }
                </Box>
            </Flex>
            <Text>{user.bio}</Text>

            {currUser._id === user._id && (
                <Link to={"/update"}>
                    <Button size={"sm"} >Update Profile</Button>
                </Link>
            )}
            {currUser._id === !user._id && (
                <Link to={"/update"}>
                    <Button size={"sm"} >Follow</Button>
                </Link>
            )}

            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>{user.followers.length} followers</Text>
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

            <Flex w={"full"} >
                <Flex 
                flex={1} 
                justifyContent={"center"}
                pb={3}
                cursor={"pointer"}
                borderBottom={"1.5px solid white"}
                >
                    <Text fontWeight={"bold"}>Breads</Text>
                </Flex>
                <Flex flex={1}
                justifyContent={"center"}
                borderBottom={"1px solid gray"}
                color={"gray.light"}
                pb={3}
                cursor={"pointer"}
                >
                    <Text>Replies</Text>
                </Flex>
            </Flex>
        </VStack>
     );
}
 
export default UserNavbar;