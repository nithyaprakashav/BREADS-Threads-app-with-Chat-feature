import userAtom from "../../Frontend/src/atoms/userAtom";
import useShowToast from "../../Frontend/src/hooks/useShowToast"
import useRecoilValue from "recoil"
import Conversation from "../models/ConversationModel";
import Message from "../models/MessageModel";



const showToast = useShowToast()
const user = useRecoilValue(userAtom)

export const sendMessage = async (req, res) => {
    try {
        const {recipientId , message} = req.body;
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: {$all : [senderId , recipientId]}
        })

        if(!conversation){
            conversation= new Conversation({
                participants:[senderId,recipientId],
                lastMessage:{
                    text:message,
                    sender: senderId
                }
            })
            await Conversation.save()
        }

        const newMessage = new Message({
            conversationId: conversation._id,
            sender:senderId,
            text: message
        })

    } catch (err) {
        res.status(500).json({error: err.message})
        showToast("Error", err.message , "error")
    }
}
