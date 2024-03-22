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
            username: user.username
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
        
    } catch (err) {
        res.status(500).json({mssg: err.message})
    }
}

export {signupUser , loginUser , logoutUser , followUnfollowUser}