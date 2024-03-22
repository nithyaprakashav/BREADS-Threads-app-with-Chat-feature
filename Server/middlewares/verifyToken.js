import User from "../models/UserModel"


const verifyToken = async ( req , res ,next) => {
    try {
        let token = req.cookies.token
        if(!token){
            return res.sendStatus(403).send("Access denied")
        }
        const verified = jwt.verify(token , process.env.SECRET)
        
        const user = await User.findById(verified.userId).select("-password")

        req.user = user;
        next()

    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

export default verifyToken