import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import { sendMessage,getMessages } from '../controllers/messageController.js'

const router = express.Router()

router.post('/',verifyToken,sendMessage)
router.get('/:otherUserId',verifyToken,getMessages)

export default router
