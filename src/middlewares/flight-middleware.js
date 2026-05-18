const {StatusCodes}=require('http-status-codes');
const {ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.flightNumber){
        ErrorResponse.message="Something went wrong while creating flights";
        
        ErrorResponse.error=new AppError(["Flight Number is not defined"],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(
           ErrorResponse
        )
    }
     if(!req.body.departureAirportId){
        ErrorResponse.message="Something went wrong while creating flights";
        
        ErrorResponse.error=new AppError(["Departure Airport ID is not defined"],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(
           ErrorResponse
        )
    }
     if(!req.body.arrivalAirportId){
        ErrorResponse.message="Something went wrong while creating flights";
        
        ErrorResponse.error=new AppError(["Arrival Airport ID is not defined"],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(
           ErrorResponse
        )
    }
     if(!req.body.airplaneId){
        ErrorResponse.message="Something went wrong while creating flights";
        
        ErrorResponse.error=new AppError(["Airplane ID is not defined"],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(
           ErrorResponse
        )
    }
     if(!req.body.totalSeats){
        ErrorResponse.message="Something went wrong while creating flights";
        
        ErrorResponse.error=new AppError(["Total seats is not defined"],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(
           ErrorResponse
        )
    }
     if(!req.body.arrivalTime){
        ErrorResponse.message="Something went wrong while creating flights";
        
        ErrorResponse.error=new AppError(["Arrival Time is not defined"],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(
           ErrorResponse
        )
    }
    if(!req.body.departureTime){
        ErrorResponse.message="Something went wrong while creating flights";
        
        ErrorResponse.error=new AppError(["Departure Time is not defined"],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(
           ErrorResponse
        )
    }
    if(!req.body.price){
        ErrorResponse.message="Something went wrong while creating flights";
        
        ErrorResponse.error=new AppError(["Price is not defined"],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(
           ErrorResponse
        )
    }
    next();
}

function updateValidateRequest(req,res,next){
     if(!req.body || !req.body.seats){
        ErrorResponse.message="Something went wrong while updating flights";
        
        ErrorResponse.error=new AppError(["Total seats is not defined"],StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(
           ErrorResponse
        )
    }
    next();
}

module.exports={
    validateCreateRequest,
    updateValidateRequest
}