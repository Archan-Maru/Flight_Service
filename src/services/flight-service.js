const {FlightRepository}=require('../repositories')
const AppError=require('../utils/errors/app-error')
const flightRepository=new FlightRepository();
const {StatusCodes}=require('http-status-codes');
const {compareTime}=require('../utils/helpers/datetime-helpers')
const {Op}=require('sequelize');

async function createFlight(data){
    try {
        if(!compareTime(data.arrivalTime,data.departureTime)){
            throw new AppError('Arrival Time should be greater than Departure Time',StatusCodes.BAD_REQUEST);
        }
        const flight=await flightRepository.create(data);
        return flight;
    } catch (error) {
        if(error instanceof AppError){
            throw error;
        }

        if(error.name=='SequelizeValidationError'){
            const explaination=[];
            error.errors.forEach(err => {
                explaination.push(err.message);
            });
            throw new AppError(explaination,StatusCodes.BAD_REQUEST);
        }

        if(error.name=='SequelizeDatabaseError' || error.name=='SequelizeForeignKeyConstraintError'){
            throw new AppError(error.message,StatusCodes.BAD_REQUEST);
        }

        throw new AppError('Cannot create a new flight object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateFlight(id,data){
    try {
        const flight=await flightRepository.update(id,data);
        return flight;
    } catch (error) {
         if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Requested flight is not avaialble',error.statusCode);
        }
        throw new AppError('Cannot edit data of flight',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query){
    const endTrip="23:59:00";
    const customFilter={};
    let sortFilter=[];
    if(query.trips){
        const [departureAirportId,arrivalAirportId]=query.trips.split("-");
        customFilter.departureAirportId=departureAirportId;
        customFilter.arrivalAirportId=arrivalAirportId;
    }
    if(query.price){
        const [minPrice,maxPrice]=query.price.split("-");
        customFilter.price={
            [Op.between]:[minPrice,maxPrice==undefined?200000:maxPrice]
        }
    }
    if(query.travellers){
        customFilter.totalSeats={
            [Op.gte]:query.travellers
        }
    }
    if(query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query. tripDate,query.tripDate+endTrip]
        }
    }
    if(query.sort){
    const params = query.sort.split( ',');
    const sortFilters = params.map((param) => param.split('_'));
    sortFilter = sortFilters
}
    try {
        const flights=await flightRepository.getAllFlights(customFilter.sortFilter);
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch data of flights',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports ={ 
    createFlight,
    updateFlight,
    getAllFlights
}