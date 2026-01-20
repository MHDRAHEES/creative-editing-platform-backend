import express from 'express'
import { updateUser } from '../Controller/PatchUser.js'

const router=express.Router()

router.patch('/user/:id',updateUser)

export default router
