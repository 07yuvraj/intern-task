import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../model/userModel.js'

const protect = expressAsyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            console.log(token);

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (err) {
            res.status(401)
            throw new Error('Not Authorized,no token')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized')
    }

})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

const seller = (req, res, next) => {
    if (req.user && req.user.isSeller) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as a Seller')
    }
}

export { protect, admin, seller }