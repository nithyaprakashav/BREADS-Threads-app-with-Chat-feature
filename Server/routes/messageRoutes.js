import express from 'express'

const router = express.Router()

router.post('/',(req,res)=> res.send("message route"))

export default router