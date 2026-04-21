const {AirportRepository}=require('../repositories')
const AppError=require('../utils/errors/app-error')
const airportRepository=new AirportRepository();
const {StatusCodes}=require('http-status-codes');

async function createAirport(data){
    try {
        const airport=await airportRepository.create(data);
        return airport;
    } catch (error) {
        if(error.name=='SequelizeValidationError'){
            let explaination=[];
            error.errors.forEach(err => {
                explaination.push(err.message);
            });
            throw new AppError(explaination,StatusCodes.BAD_REQUEST);
        }

        throw new AppError('Cannot create a new airport object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports(){
    try {
        const airports=await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError('Cannot fetch data of all airports',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id){
      try {
        const airport=await airportRepository.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Requested airport is not avaialble',error.statusCode);
        }
        throw new AppError('Cannot fetch data of airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id){
    try {
        const response=await airportRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airport you want to delete is not avaialble',error.statusCode);
        }
        throw new AppError('Cannot fetch data of airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(id,data){
    try {
        const airport=await airportRepository.update(id,data);
        return airport;
    } catch (error) {
         if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Requested airport is not avaialble',error.statusCode);
        }
        throw new AppError('Cannot edit data of airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports ={ 
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}