
import Conversation from "../models/ConversationModel.js";
import Message from "../models/MessageModel.js";

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
            await conversation.save()
        }

        const newMessage = new Message({
            conversationId: conversation._id,
            sender:senderId,
            text: message
        })

        await Promise.all([
            newMessage.save(),
            conversation.updateOne({
                lastMessage:{
                    text:message,
                    sender:senderId,

                }
            })
        ])

        res.status(201).json(newMessage)

    } catch (err) {
        res.status(500).json({error: err.message})
        // showToast("Error", err.message , "error")
    }
}
