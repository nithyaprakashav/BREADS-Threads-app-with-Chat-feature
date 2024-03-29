import User from "../models/UserModel.js"
import Post from "../models/PostModel.js"

export const createPost = async ( req , res) => {
    try {
        const {postedBy , text , img} = req.body
        if(!postedBy || !text) return res.status(400).json({mssg: "postedBy and text fields are required"})
        const user = await User.findById(postedBy)
    if(!user) return res.status(404).json({mssg: "User not found"})
    if(user._id.toString() !== req.user._id.toString()){
        return res.status(401).jsoj({mssg : "Unauthorized !!"})
    }
    if(text.length > 500) return res.status(400).json({mssg: "Text must be less than 500 characters"})

    const newPost = new Post({postedBy , text ,img})
    await newPost.save()
    res.status(201).json({mssg:"Post created successfully" , newPost})

    } catch (err) {
        res.status(500).json({mssg : err.message})
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post) {
            return res.status(404).json({message:"Post not found"})
        }
        res.status(200).json({post})

    } catch (err) {
        res.status(400).json({mssg:err.message})
    }
}

export const deletePost = async (req , res) => {
    try {
        const post =await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({mssg:"Post not found"})
        }
        if(post.postedBy.toString() !== req.user._id.toString()){
            return res.status(401).json({mssg:"Unauthorized to delete the post"})
        }

        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({mssg:"Post deleted successfully"})
    } catch (err) {
        res.status(400).json({mssg:err.message})
    }
}

export const likeUnlikePost = async (req, res) => {
    try {
        const {id:postId} = req.params
        const userId  = req.user._id
        const post = await Post.findById(postId)

        if(!post) return res.status(404).json({mssg:"post not found"})
        const isUserLikedPost = post.likes.includes(userId)
        if(isUserLikedPost){
            await Post.updateOne({_id:postId} , {$pull:{likes:userId}})
            res.status(200).json({mssg:"post unliked successfully"})
        }else{
            post.likes.push(userId)
            await post.save()
            res.status(200).json({mssg:"post liked successfully"})
        }
    } catch (err) {
        res.status(400).json({mssg:err.message})
    }
}

export const commentPost = async(req , res) => {
    try {
        const {text} = req.body
        const {id:postId}= req.params
        const userId = req.user._id
        const profilePic = req.user.profilePic
        const username  = req.user.username

        if(!text) return res.status(400).json({mssg:"Text fields are required"})

        if(profilePic) return res.status(400).json(profilePic)
        // if(username) return res.status(400).json(username)
        

        const post = await Post.findById(postId)
        if(!post) return res.status(404).json({mssg:"Post not found"})
        const comment = {userId , text , username:username , profilePic:profilePic}

        post.comments.push(comment)
        await post.save()

        res.status(200).json({mssg:"Comment added successfully" , post})
        
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

export const getFeedPosts = async (req, res) => {
    try {
        const userId = req.user._id
        const user= await User.findById(userId)
        if(!user){
            return res.status(404).json({mssg:"User not found"})
        }
        const following = user.following
        const feedPosts  = await Post.find({postedBy:{$in:following}}).sort({createdAt:-1})

        res.status(200).json({feedPosts})
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}