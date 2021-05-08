import expressAsyncHandler from 'express-async-handler'
import generateToken from '../utills/generateToken.js'
import User from '../model/userModel.js'

const adminLogin = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && await user.matchPassword(password) && (!user.isAdmin)) {
        res.status(404)
        throw new Error('Please login using appropriate Method')
    }

    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const sellerLogin = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && await user.matchPassword(password) && (!user.isSeller)) {
        res.status(404)
        throw new Error('Please login using appropriate Method')
    }

    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const buyerLogin = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && await user.matchPassword(password) && (user.isSeller || user.isAdmin)) {
        res.status(404)
        throw new Error('Please login using appropriate Method')
    }

    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const getUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find({})

    res.json(users)
})

const getUserById = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
    res.json(users)
})


const registerBuyer = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(404)
        throw new Error('User already exists')
    }

    const user = await User.create(
        { name, email, password }
    )

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(user._id)
        })
    } else {
        res.status(404)
        throw new Error('Invalid user')
    }
})

const registerSeller = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    const isSeller = true

    if (userExists) {
        res.status(404)
        throw new Error('User already exists')
    }

    const user = await User.create(
        { name, email, password, isSeller }
    )

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(user._id)
        })
    } else {
        res.status(404)
        throw new Error('Invalid user')
    }
})

export { adminLogin, sellerLogin, buyerLogin, registerBuyer, getUsers, registerSeller, getUserById }