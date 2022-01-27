const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequest, UnauthorizedError} = require('../errors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const register = async(req,res)=>{
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name:user.name},token})
}
const login = async(req,res)=>{
    const {email, password} = req.body

    if(!email||!password){
        throw new BadRequest('Please provide email and password')
    }

    const user = await User.findOne({email})

    if(!user){
        throw new UnauthorizedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthorizedError('Invalid Credentials')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name}, token})

}

module.exports = {register,login}