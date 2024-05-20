import { Flex , Image, useColorMode ,Text , Link, Button} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import {Link as RouterLink, useParams, } from "react-router-dom"
import {AiFillHome} from "react-icons/ai"
import {RxAvatar} from "react-icons/rx"
import LogoutButton from "./LogoutButton";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

const NavBar = ({isLoggedIn}) => {
    
    const {colorMode, toggleColorMode} = useColorMode()
    const user = useRecoilValue(userAtom)
    
    return ( 
        <Flex
        justifyContent={ isLoggedIn?  "space-between": "center"} mt={6} mb={12}
        >

            {user && (
                <Link as={RouterLink} to={"/"} >
                    <AiFillHome size={25} />
                </Link>
            )}

            <Flex>
            <Image cursor="pointer"
            alt="logo"
            w={6}
            src={ colorMode == "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
            onClick={toggleColorMode}
            />
            <Text 
            fontSize={"large"} 
            pl={1} 
            onClick={toggleColorMode}
            cursor={"pointer"}
            >Breads</Text>
            </Flex>


            {user && (

                // {username === user.username ? ():()}

                <Flex display={"flex"} alignItems={"center"} justifyContent={"space-between"} gap={3} >
                    <Link as={RouterLink} to={`/${user.username}`} >
                        <RxAvatar size={25} />
                    </Link>
                    <Link as={RouterLink} to={`/chat`} >
                        <IoChatboxEllipsesOutline size={24} />
                    </Link>
                    <LogoutButton/>
                </Flex>
            )}

        </Flex>
     )
}
 
export default NavBar;