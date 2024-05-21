import mongoose from 'mongoose'

const convoSchema = new mongoose.Schema({
    participants:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
    lastMessage:{
        text:String,
        sender:{type:mongoose.Schema.Types.ObjectId, ref:'User'}
    }
},{timestamps:true})

const Conversation = mongoose.model('Conversation',convoSchema)

export default Conversation;