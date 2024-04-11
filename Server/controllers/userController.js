import mongoose from "mongoose"
import generateToken from "../Utils/generateToken.js"
import User from "../models/UserModel.js"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from "cloudinary"

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

        res.status(200).json({
            id:user._id,
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

export {signupUser , loginUser , logoutUser , followUnfollowUser , updateUser , getUserProfile}