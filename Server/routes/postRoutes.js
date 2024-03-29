import express from 'express'
import { createPost , getPost ,deletePost , likeUnlikePost} from '../controllers/postController.js'
import verifyToken from '../middlewares/verifyToken.js'


const router = express.Router()

router.get("/:id" ,verifyToken, getPost)
router.post ("/create" ,verifyToken, createPost)
router.delete ("/delete/:id" ,verifyToken, deletePost)
router.post("/like/:id" , verifyToken , likeUnlikePost )


export default router