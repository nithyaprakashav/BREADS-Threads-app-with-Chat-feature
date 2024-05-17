import { Avatar, Flex, Text } from "@chakra-ui/react";

const Message = ({userMessage,}) => {
    return ( 
        <>
        {userMessage ? (
            <Flex
            gap={2}
            alignSelf={"flex-end"}
            >  
                <Text maxW={"350px"} bg={"blue.400"} p={1} borderRadius={"md"} >Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Text>
                <Avatar src="" w={7} h={7} />
            </Flex>
        ):(
            <Flex
            gap={2}
            
            >  
                <Avatar src="" w={7} h={7} />
                <Text maxW={"350px"} bg={"blue.400"} p={1} borderRadius={"md"} >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora quae sit exercitationem numquam similique, voluptatibus est praesentium natus delectus eius!</Text>
                
            </Flex>
        )}
        
        </>
     );
}
 
export default Message;
