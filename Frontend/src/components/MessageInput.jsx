import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import {IoSendSharp} from "react-icons/io5"
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";


const MessageInput = ({setMessage}) => {

    const showToast = useShowToast()
    const[messageData,setMessageData] = useState('')
    const selectedConversation= useRecoilValue(selectedConversationAtom)

    const handleSendMessage= async (e)=>{
        e.preventDefault();
        if(!messageData) return

        try {
            const response = await fetch('/api/messages',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    recipientId: selectedConversation.userId,
                    message:messageData
                })
            })

            const data = await response.json()
            if(data.error){
                showToast("Error",data.error,"error")
                return
            }
            setMessage((messages)=> [...messages,data])

        } catch (error) {
            showToast("Error",error.message,"error")
        }finally{
            setMessageData('')
        }
    }

    return ( 
        <form onSubmit={handleSendMessage} >
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
     );
};
 
export default MessageInput;
