import express from 'express'
const router = express.Router()
import {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    getAllProducts
} from '../controllers/productController.js'
import { protect, seller } from '../middleware/authMiddleware.js'

router
    .route('/')
    .get(protect,seller,getProducts)
    .post(protect, seller, createProduct)
router.route('/allproduct').get(getAllProducts)
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, seller, deleteProduct)
    .put(protect, seller, updateProduct)


export default router