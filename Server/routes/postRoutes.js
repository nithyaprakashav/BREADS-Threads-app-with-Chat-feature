import express from 'express'
import { createPost } from '../controllers/postController.js'
import verifyToken from '../middlewares/verifyToken.js'


const router = express.Router()

router.post ("/create" ,verifyToken, createPost)


export default router