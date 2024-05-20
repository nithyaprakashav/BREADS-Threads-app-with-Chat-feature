import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import { sendMessage } from '../controllers/messageController.js'

const router = express.Router()

router.post('/',verifyToken,sendMessage)

export default router
