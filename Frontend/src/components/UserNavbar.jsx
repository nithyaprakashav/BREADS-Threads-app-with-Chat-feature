import { Avatar, Box,Text, Flex, VStack, Menu, MenuButton, Portal, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {BsInstagram } from "react-icons/bs"
import {CgMoreO} from "react-icons/cg"
import { useToast } from '@chakra-ui/react'
import {useRecoilValue} from "recoil"
import userAtom from "../atoms/userAtom"
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";


const UserNavbar = ({user}) => {
    const toast = useToast()
    const showToast = useShowToast()
    const currUser = useRecoilValue(userAtom)
    const [following , setFollowing] = useState(user.following.includes(currUser._id))
    
    console.log(following)
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
    
    const handleFollow = async () => {
        try {
            const response = await fetch(`api/users/follow/${user._id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await response.json()
            if(data.error){
                showToast("Error" , data.error , "error")
                return
            }
            console.log(data)
            
            if(following){
                showToast("Success" , `Unfollowed ${user.firstname} ${user.lastname}`,"success")
                user.followers.pop()
            }else{
                showToast("Success" , `Followed ${user.firstname} ${user.lastname}`,"success")
                user.followers.push(currUser._id)
            }

            setFollowing(!following)

        } catch (err) {
            showToast("Error" , err , "error")
        }
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
            {currUser._id !== user._id && (
                    <Button size={"sm"} onClick={handleFollow}>
                        {following ? "Unfollow" : "Follow"}
                        </Button>
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