import { Flex , Image, useColorMode ,Text} from "@chakra-ui/react";

const NavBar = () => {

    const {colorMode, toggleColorMode} = useColorMode()

    return ( 
        <Flex
        justifyContent={"center"} mt={6} mb={12}
        >
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
     );
}
 
export default NavBar;