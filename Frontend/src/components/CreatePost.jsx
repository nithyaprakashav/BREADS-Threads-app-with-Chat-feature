import { Button, FormControl, Textarea, useColorModeValue , Text, Input, Flex  , Image, CloseButton} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons"
import { Modal , ModalOverlay , ModalContent , ModalHeader , ModalCloseButton , ModalBody , ModalFooter } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import useImgPreview from "../hooks/useImgPreview";
import { BsFillImageFill } from "react-icons/bs";
const MAX_CHAR = 500


const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [postText , setPostText] = useState('')
    const {handleImageChange , imageUrl , setImageUrl} = useImgPreview()
    const imageRef = useRef(null)
    const [remainingChar , setRemainingChar] = useState(MAX_CHAR)

    const handleTextChange = (e) => {
        const inputText = e.target.value

        if(inputText.length > MAX_CHAR){
            const truncatedText = inputText.slice(0, MAX_CHAR)
            setPostText(truncatedText)
            setRemainingChar(0)
        }else{
            setPostText(inputText)
            setRemainingChar(MAX_CHAR - inputText.length)
        }
    }

    const handlePost = async() => {

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
                            {remainingChar}/{MAX_CHAR}
                        </Text>
                        <Input
                            type="file"
                            hidden
                            ref={imageRef}
                            onChange={handleImageChange}
                        />
                        <BsFillImageFill style={{marginLeft:"5px" ,cursor:"pointer" , size:"16" }} onClick={() => imageRef.current.click()} />
                    </FormControl>

                    {imageUrl && (
                        <Flex mt={5} w={"full"} position={"relative"} >
                            <Image src={imageUrl} alt="Selected Image" />
                            <CloseButton onClick={()=>{
                                setImageUrl("")
                            }}
                            background={"gray.800"}
                            position={"absolute"}
                            top={2}
                            right={2}
                            />
                        </Flex>
                    )}

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={handlePost}>
                    Post
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
     );
}
 
export default CreatePost;