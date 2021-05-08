import express from 'express'
const router = express.Router()
import { adminLogin, sellerLogin, buyerLogin, registerSeller, registerBuyer, getUsers, getUserById } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getUsers)
router.route('/seller').post(registerSeller)
router.route('/buyer').post(registerBuyer)
router.post('/login/admin', adminLogin)
router.post('/login/seller', sellerLogin)
router.post('/login/buyer', buyerLogin)
router.route('/:id').get(protect, admin, getUserById)

export default router