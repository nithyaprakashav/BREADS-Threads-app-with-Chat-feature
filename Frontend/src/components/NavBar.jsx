import { Flex , Image, useColorMode ,Text , Link} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import {Link as RouterLink} from "react-router-dom"
import {AiFillHome} from "react-icons/ai"
import {RxAvatar} from "react-icons/rx"


const NavBar = () => {

    const {colorMode, toggleColorMode} = useColorMode()
    const user = useRecoilValue(userAtom)
    return ( 
        <Flex
        justifyContent={"space-between"} mt={6} mb={12}
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
                <Link as={RouterLink} to={`/${user.username}`} >
                    <RxAvatar size={25} />
                </Link>
            )}

        </Flex>
     );
}
 
export default NavBar;