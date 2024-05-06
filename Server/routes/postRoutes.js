import express from 'express'
import { createPost , getPost ,deletePost , likeUnlikePost , commentPost , getFeedPosts, getUserPosts} from '../controllers/postController.js'
import verifyToken from '../middlewares/verifyToken.js'


const router = express.Router()

router.get("/feed" , verifyToken , getFeedPosts)
router.get("/:id" ,verifyToken, getPost)
router.post ("/create" ,verifyToken, createPost)
router.delete ("/delete/:id" ,verifyToken, deletePost)
router.put("/like/:id" , verifyToken , likeUnlikePost )
router.put("/comment/:id" , verifyToken , commentPost )
router.get("/user/:username",verifyToken, getUserPosts)


export default router