
import { getRecipientsSocketId, io } from "../Socket/socket.js";
import Conversation from "../models/ConversationModel.js";
import Message from "../models/MessageModel.js";
import {v2 as cloudinary} from 'cloudinary'


export const sendMessage = async (req, res) => {
    try {
        const {recipientId , message} = req.body;
        let {img} = req.body; 
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

        if(img){
            const uploadedResponse = await cloudinary.uploader.upload(img)
            img = uploadedResponse.secure_url
        }

        const newMessage = new Message({
            conversationId: conversation._id,
            sender:senderId,
            text: message,
            img:img || "",
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

        const recipientsSocketId = getRecipientsSocketId(recipientId)

        if(recipientsSocketId){
            io.to(recipientsSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)

    } catch (err) {
        res.status(500).json({error: err.message})
        // showToast("Error", err.message , "error")
    }
}


export const getMessages = async (req, res) => {
    const{otherUserId} = req.params;
    const userId = req.user._id
    console.log("curruserID :",userId,"OtherUserId :",otherUserId)
    try {
        
        const conversation = await Conversation.findOne({
            participants:{$all:[userId,otherUserId]}
        })

        if(!conversation) return res.status(404).json({error:"Conversation not found"})

        const messages = await Message.find({
            conversationId: conversation._id,
        }).sort({createdAt: 1})

        if(!messages) return res.status(404).json({error:"Messages not found"})

        res.status(200).json(messages)

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const getConversations = async (req, res)=> {
    const userId = req.user._id;
    try {
        const conversations = await Conversation.find({participants:userId}).populate({
            path:"participants",
            select:"username profilePic "
        })

        conversations.forEach(conversation=>{
            conversation.participants = conversation.participants.filter(
                (participant) => participant._id.toString() !== userId.toString()
            )
        })

        res.status(200).json(conversations)

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}