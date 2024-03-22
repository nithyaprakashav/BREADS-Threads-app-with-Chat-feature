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


export {signupUser}