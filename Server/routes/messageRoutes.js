import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import { sendMessage } from '../controllers/messageController'

const router = express.Router()

router.post('/',verifyToken,sendMessage)

export default router
