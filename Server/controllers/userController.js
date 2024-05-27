import mongoose from "mongoose"
import generateToken from "../Utils/generateToken.js"
import User from "../models/UserModel.js"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from "cloudinary"
import Post from "../models/PostModel.js"

const signupUser = async (req, res) => {
    try {
        const {firstname , lastname , username , email , password} = req.body
        const user = await User.findOne({$or: [{email},{username}]})
        if(user){
            return res.status(400).json({error: "User already exists"}) 
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        const newUser = new User({
            firstname ,
            lastname,
            email , 
            username , 
            password: hashedPassword,
        })

        await newUser.save()

        if(newUser){

            generateToken(newUser._id , res);
            res.status(201).json({
                _id : newUser._id,
                firstname:newUser.name,
                lastname:newUser.name,
                email: newUser.email,
                username: newUser.username,
                bio:newUser.bio,
                profilePic: newUser.profilePic,
            })
        }else{
            res.status(400).json({error: "Invalid user data"})
        }

    } catch (err) {
        res.status(500).json({error : err.message})
        console.log("Error in signupUser :",err.message)
    }
}


const loginUser = async (req ,res) => {
    try {
        const {username , password} = req.body;
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({error : "Invalid Username"})
        }
        const isPassword = await bcrypt.compare(password , user.password)
        if(!isPassword) return res.status(400).json({error : "Invalid Password"})
        generateToken(user._id  , res)

        if(user.isFrozen){
            user.isFrozen = false;
            await user.save()
        }

        res.status(200).json({
            _id:user._id,
            firstname:user.firstname,
            lastname:user.lastname, 
            email : user.email, 
            username: user.username,
            profilePic: user.profilePic,
            bio:user.bio,
        })

    } catch (err) {
        res.status(500).json({error: err.message})
    }
}


const logoutUser = (req ,res) => {
    try {
        res.cookie("jwt" , "" , {maxAge: 1})
        res.status(200).json({mssg:"Logout success"})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}


const followUnfollowUser = async (req, res) => {
    try {
        const {id} = req.params
        const userToActOn = await User.findById(id)
        const currUser = await User.findById(req.user._id)

        if(id === req.user._id.toString()) return res.status(400).json({error: "you cannot follow or unfollow yourself"})

        if(!userToActOn || !currUser) return res.status(500).json({error: "User not found"})

        const isFollowing = currUser.following.includes(id)

        if(isFollowing){
            await User.findByIdAndUpdate(req.user._id , {$pull: {following:id}})
            await User.findByIdAndUpdate(id , {$pull: {followers: req.user._id}})
            res.status(200).json({mssg: "User unfollowed successfully"})
        }else{
            await User.findByIdAndUpdate(req.user._id , {$push: {following:id}})
            await User.findByIdAndUpdate(id , {$push: {followers: req.user._id}})
            res.status(200).json({mssg: "User followed successfully"})
        }

    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

const updateUser = async (req, res) => {
    try {
        const {firstname, lastname , email , username , password , bio}= req.body
        let {profilePic} = req.body
        const userId = req.user._id
        // console.log(userId.toString() , req.params.id)
        let user = await User.findById(userId)
        if(!user){
            return res.status(400).json({error: "User not found"})
        }

        if(req.params.id !== userId.toString()) return res.status(400).json({error:"You cannot update other user's profile"})

        if(password){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword =await bcrypt.hash(password , salt)
            user.password = hashedPassword
        }

        if(profilePic){
            if(user.profilePic){
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0])
            }
            const uploadedResponse = await cloudinary.uploader.upload(profilePic)
            profilePic = uploadedResponse.secure_url
        }

        user.firstname = firstname || user.name
        user.lastname = lastname || user.name
        user.email = email || user.email
        user.username = username || user.username
        user.profilePic = profilePic || user.profilePic
        user.bio = bio || user.bio
        user = await user.save()

        //FINDING ALL THE POSTS THAT USER HAVE REPLIED AND UPDATED THEIR USERNAME AND PROFILEPIC IN THE COMMENTS WHEN THE USER UPDATES HIS PROFILE
        await Post.updateMany(
            {"comments.userId":userId},
            {
                $set:{
                    "comments.$[comment].username":user.username,
                    "comments.$[comment].userProfilePic":user.profilePic,
                }
            },
            {arrayFilters:[{"comment.userId":userId}]}
        )

        user.password = null

        res.status(200).json(user)

    } catch (err) {
        res.status(500).json({error: err.message})
    }
}


const getUserProfile = async (req, res) => {
    //query is either going to be username or userId so we can fetch by either of them
    const {query} = req.params
    try {
        let user;

        //checking if the quesy is username or ObjectId
        if(mongoose.Types.ObjectId.isValid(query)){
            user = await User.findById(query).select("-password").select("-updatedAt")
        }else{
            user = await User.findOne({username: query}).select("-password").select("-updatedAt")
        }
        if(!user) return res.status(400).json({error : "User Not Found"})
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

const getSuggestedUsers = async (req,res) => {
    try {
        const currUserId = req.user._id

        const usersIAmFollowing = await User.findById(currUserId).select("following")

        const users = await User.aggregate([
            {
                $match:{
                    _id:{$ne:currUserId}
                }
            },{
                $sample:{size:10}
            }
        ])

        const filteredUsers = users.filter( user => !usersIAmFollowing.following.includes(user._id))

        const suggestedUsers = filteredUsers.slice(0,4)

        suggestedUsers.forEach(user => user.password = null)

        res.status(200).json(suggestedUsers)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

    const freezeAccount = async (req,res)=> {
        try {
            const user = await User.findById(req.user._id)
            if(!user){
                return res.status(404).json({error: "User not found"})
            }
            user.isFrozen = true;
            await user.save()

            res.status(200).json({success: true})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    } 

export {freezeAccount,getSuggestedUsers, signupUser , loginUser , logoutUser , followUnfollowUser , updateUser , getUserProfile}