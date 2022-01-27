const {StatusCodes} = require('http-status-codes')

const errorHandler = async(err,req,res,next)=>{
    
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message || "Somethin went wrong "
    }
    console.log(customError.msg)
    if(err.name === "ValidationError"){
        
        customError.msg = Object.values(err.errors).map((item)=>item.message).join(',')
        customError.statusCode = StatusCodes.BAD_REQUEST
    }
    // if(err instanceof CustomAPIError){
    //     return res.status(err.statusCode).json({msg:err.message})
    // }
    if(err.code && err.code === 11000){
        customError.msg = `Value entered for ${Object.keys(err.keyValue)} field already exists, please choose another value`
        customError.statusCode = StatusCodes.BAD_REQUEST
    }
    if(err.name === "CastError"){
        customError.msg = `No item found with id : ${err.value}`
        customError.statusCode = StatusCodes.NOT_FOUND
    }
    return res.status(customError.statusCode).json({msg:customError.msg})
}

module.exports = errorHandler