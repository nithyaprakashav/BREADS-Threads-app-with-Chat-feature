import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDB connected successfully : ${connect.connection.host}`)
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

export default connectDB