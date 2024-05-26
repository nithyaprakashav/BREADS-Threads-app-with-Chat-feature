import { Flex, Image, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import {IoSendSharp} from "react-icons/io5"
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import { conversationsAtom, selectedConversationAtom } from "../atoms/messagesAtom";
import { BsFillImageFill } from "react-icons/bs";
import useImgPreview from "../hooks/useImgPreview";


const MessageInput = ({setMessage}) => {

    const showToast = useShowToast()
    const[messageData,setMessageData] = useState('')
    const selectedConversation= useRecoilValue(selectedConversationAtom)
    const [conversations,setConversations] = useRecoilState(conversationsAtom)
    const imageRef = useRef(null)
    const{onClose} = useDisclosure()
    const {handleImageChange , imageUrl , setImageUrl} = useImgPreview()
    const [isSending, setIsSending] = useState(false)

    const handleSendMessage= async (e)=>{
        e.preventDefault();
        if(!messageData && !imageUrl) return;
        if(isSending) return;
        setIsSending(true)

        try {
            const response = await fetch('/api/messages',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    recipientId: selectedConversation.userId,
                    message:messageData,
                    img:imageUrl,
                })
            })

            const data = await response.json()
            if(data.error){
                showToast("Error",data.error,"error")
                return
            }
            setMessage((messages)=> [...messages,data])
            setConversations((prevConvo)=>{
                const updatedConversations = prevConvo.map((conversation)=>{
                    if(conversation._id === selectedConversation._id){
                        return{
                            ...conversation,
                            lastMessage:{
                                text:messageData,
                                sender:data.sender
                            }
                        }
                    }
                    return conversation
                }) 
                return updatedConversations
            })
            
            setMessageData('')
            setImageUrl('')

        } catch (error) {
            showToast("Error",error.message,"error")
        }finally{
            
            setIsSending(false)
        }
    }

    return ( 
        <Flex gap={2} alignItems={"center"} >

            <form onSubmit={handleSendMessage} style={{flex:95}} >
                <InputGroup>
                    <Input w={"full"}  placeholder="Type a message"
                        onChange={(e)=> setMessageData(e.target.value)}
                        value={messageData}
                    />
                        <InputRightElement onClick={handleSendMessage} cursor={"pointer"} >
                        <IoSendSharp/>
                        </InputRightElement>
                </InputGroup> 
            </form>

            <Flex flex={5} cursor={"pointer"} >
                <BsFillImageFill size={20} onClick={()=> imageRef.current.click()} />
                <Input type="file" hidden ref={imageRef} onChange={handleImageChange} />
            </Flex>
            <Modal isOpen={imageUrl} onClose={()=>{
                onClose()
                setImageUrl('')
            }} >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Flex mt={5} w={"full"} >
                            <Image src={imageUrl} />
                        </Flex>
                        <Flex justifyContent={"flex-end"} my={2} >
                            {!isSending ? (
                                <IoSendSharp size={24} cursor={"pointer"} onClick={handleSendMessage}/>
                            ):(
                                <Spinner size={"md"} />
                            )}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
     );
};
 
export default MessageInput;
