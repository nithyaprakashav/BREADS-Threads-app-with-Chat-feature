import { Button, FormControl, Textarea, useColorModeValue } from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons"
import { Modal , ModalOverlay , ModalContent , ModalHeader , ModalCloseButton , ModalBody , ModalFooter } from "@chakra-ui/react";


const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return ( 
        <>
            <Button
                position={"fixed"}
                bottom={10}
                right={10}
                leftIcon={<AddIcon/>}
                bg={useColorModeValue("gray.300" , "gray.dark")}
            >
                Post
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Add new Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <Textarea
                            placeholder="Post content goes here..."
                            onChange={handleTextChange}
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
     );
}
 
export default CreatePost;