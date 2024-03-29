import generateToken from "../Utils/generateToken.js"
import User from "../models/UserModel.js"
import bcrypt from 'bcrypt'

const signupUser = async (req, res) => {
    try {
        const {name , username , email , password} = req.body
        const user = await User.findOne({$or: [{email},{username}]})
        if(user){
            return res.status(400).json({message: "User already exists"}) 
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        const newUser = new User({
            name , 
            email , 
            username , 
            password: hashedPassword,
        })

        await newUser.save()

        if(newUser){

            generateToken(newUser._id , res);
            res.status(201).json({
                _id : newUser._id,
                name:newUser.name,
                email: newUser.email,
                username: newUser.username,
            })
        }else{
            res.status(400).json({message: "Invalid user data"})
        }

    } catch (err) {
        res.status(500).json({message : err.message})
        console.log("Error in signupUser :",err.message)
    }
}


const loginUser = async (req ,res) => {
    try {
        const {username , password} = req.body;
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({mssg : "Invalid Username"})
        }
        const isPassword = await bcrypt.compare(password , user.password)
        if(!isPassword) return res.status(400).json({mssg : "Invalid Password"})
        generateToken(user._id  , res)

        res.status(200).json({
            id:user._id,
            name:user.name , 
            email : user.email, 
            username: user.username,
            profilePic: user.profilePic
        })

    } catch (err) {
        res.status(500).json({mssg: err.message})
    }
}


const logoutUser = (req ,res) => {
    try {
        res.cookie("jwt" , "" , {maxAge: 1})
        res.status(200).json({mssg:"Logout success"})
    } catch (err) {
        res.status(500).json({mssg: err.message})
    }
}


const followUnfollowUser = async (req, res) => {
    try {
        const {id} = req.params
        const userToActOn = await User.findById(id)
        const currUser = await User.findById(req.user._id)

        if(id === req.user._id.toString()) return res.status(400).json({mssg: "you cannot follow or unfollow yourself"})

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
        res.status(500).json({mssg: err.message})
    }
}

const updateUser = async (req, res) => {
    try {
        const {name , email , username , password , profilePic, bio}= req.body
        const userId = req.user._id
        let user = await User.findById(userId)
        if(!user){
            return res.status(400).json({message: "User not found"})
        }

        if(req.params.id !== userId.toString()) return res.status(400).json({message:"You cannot update other user's profile"})

        if(password){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword =await bcrypt.hash(password , salt)
            user.password = hashedPassword
        } 
        user.name = name || user.name
        user.email = email || user.email
        user.username = username || user.username
        user.profilePic = profilePic || user.profilePic
        user.bio = bio || user.bio
        user = await user.save()
        res.status(200).json({message: "Profile updated successfully" , user})

    } catch (err) {
        res.status(500).json({error: err.message})
    }
}


const getUserProfile = async (req, res) => {
    const {username} = req.params
    try {
        const user = await User.findOne({username}).select("-password").select("-updatedAt")
        if(!user) return res.status(400).json({mssg : "User Not Found"})
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

export {signupUser , loginUser , logoutUser , followUnfollowUser , updateUser , getUserProfile}