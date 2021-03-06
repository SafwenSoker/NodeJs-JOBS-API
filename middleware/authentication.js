const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthorizedError } = require('../errors')

const auth = async (req,res,next)=>{
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthorizedError('Invalid authentication')
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId:payload.userId, name:payload.name}

        next()
    } catch (error) {
        throw new UnauthorizedError('Invalid authentication')
    }
}

module.exports = auth