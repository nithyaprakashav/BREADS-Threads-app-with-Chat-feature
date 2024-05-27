import express from "express"
import { signupUser , loginUser ,logoutUser ,followUnfollowUser,
updateUser, getUserProfile,getSuggestedUsers,freezeAccount } from "../controllers/userController.js"
import verifyToken from "../middlewares/verifyToken.js"

const router = express.Router()

router.post("/signup" , signupUser)
router.post("/login" , loginUser)
router.post("/logout" , logoutUser)
router.post("/follow/:id" ,verifyToken, followUnfollowUser)
router.put("/update/:id" ,verifyToken, updateUser)
router.put("/freeze" ,verifyToken, freezeAccount)
router.get("/profile/:query" , getUserProfile)
router.get("/suggested",verifyToken,getSuggestedUsers)

export default router