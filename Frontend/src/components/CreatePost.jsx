import { Button, FormControl, Textarea, useColorModeValue , Text, Input } from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons"
import { Modal , ModalOverlay , ModalContent , ModalHeader , ModalCloseButton , ModalBody , ModalFooter } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import useImgPreview from "../hooks/useImgPreview";
import { BsFillImageFill } from "react-icons/bs";



const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [postText , setPostText] = useState('')
    const {handleImageChange} = useImgPreview()
    const imageRef = useRef(null)

    const handleTextChange = () => {

    }

    return ( 
        <>
            <Button
                position={"fixed"}
                bottom={10}
                right={10}
                leftIcon={<AddIcon/>}
                bg={useColorModeValue("gray.300" , "gray.dark")}
                onClick={onOpen}
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
                            value={postText}
                        />
                        <Text fontSize={"xs"} fontWeight={"bold"} textAlign={"right"} m={1} color={"gray.800"} >
                            500/500
                        </Text>
                        <Input
                            type="file"
                            hidden
                            ref={imageRef}
                            onChange={handleImageChange}
                        />
                        <BsFillImageFill style={{marginLeft:"5px" ,cursor:"pointer" , size:"16" }} onClick={() => imageRef.current.click()} />
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