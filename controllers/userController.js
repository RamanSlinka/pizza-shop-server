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
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if(!email || !password) {
            return next(ApiError.bedRequest('Incorrect email or password'))
        }
        const candidate = await User.findOne({email})
        if (candidate) {
            return next(ApiError.bedRequest('User already exist'))
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
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return next(ApiError.internal('User not find'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Password wrong'))
        }
        const token = generateJwt(user._id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const {id} = req.query
        if (!id) {
            return next(ApiError.bedRequest('not ID'))
        }
        res.json(id)
    }
}

module.exports = new UserController()