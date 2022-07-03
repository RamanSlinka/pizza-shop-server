const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User')


const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        'key',
        //  process.env.SECRET_KEY,   //-> bug
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res) {

        try {
            const {email, password, role} = req.body
            if (!email || !password) {
                return res.status(400).json('Incorrect email or password')
            }
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(500).json('User already exist')
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = new User({
                email: req.body.email,
                role: req.body.role,
                password: hashPassword
            })
            await user.save()

            // const basket = await Basket.create({userId: user._id})
            // use when will be "Basket" Schema

            const token = generateJwt(user._id, user.email, user.role)
            return res.json({message: 'User was created'})

        } catch (e) {
            console.log(e)
            return res.status(500).json(e, 'server error')
        }

    }

    async login(req, res) {

        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(404).json({message: "User not found"})
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return res.status(400).json({message: "Invalid password"})
            }
            const token = generateJwt(user._id, user.email, user.role)
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            })

        } catch (e) {
            console.log(e)
            return res.status(500).json(e)
        }

    }

    async check(req, res) {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = generateJwt(req.user._id, req.user.email, req.user.role)
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json(e)
        }

    }
}

module.exports = new UserController()