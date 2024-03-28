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