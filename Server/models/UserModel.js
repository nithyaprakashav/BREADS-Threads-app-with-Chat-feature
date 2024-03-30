import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstname:{
        type: String,
        required : true,
    },
    lastname:{
        type: String,
        required : true,
    },
    username:{
        type: String , 
        required: true,
        unique:true , 
    },
    email:{
        type: String,
        required: true , 
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minLength : 6
    },
    profilePic:{
        type: String,
        default:"",
    },
    followers:{
        type: [String],
        default: []
    },
    following:{
        type:[String],
        default:[]
    },
    bio:{
        type:String,
        default:"",
    }
},{
    timeStamps: true,
})

const User = mongoose.model('User' , userSchema)

export default User