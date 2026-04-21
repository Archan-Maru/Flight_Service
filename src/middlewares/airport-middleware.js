const {StatusCodes}=require('http-status-codes');
const {ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message="Something went wrong while creating airplane";
        
        ErrorResponse.error=new AppError(["Name is not defined"],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(
           ErrorResponse
        )
    }
    if(!req.body.code){
        ErrorResponse.message="Something went wrong while creating airplane";
        
        ErrorResponse.error=new AppError(["code is not defined"],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(
           ErrorResponse
        )
    }
    if(!req.body.city_id){
        ErrorResponse.message="Something went wrong while creating airplane";
        
        ErrorResponse.error=new AppError(["city_id is not defined"],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(
           ErrorResponse
        )
    }
    next();
}

module.exports={
    validateCreateRequest
}