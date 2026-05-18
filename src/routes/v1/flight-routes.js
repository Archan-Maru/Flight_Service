const express=require('express');
const router=express.Router();
const {FlightController}=require('../../controllers');
const {FlightMiddlewares}=require('../../middlewares')


router.post('/',
    FlightMiddlewares.validateCreateRequest,
    FlightController.createFlight);

router.patch('/:id',FlightController.updateFlight);

router.get('/',
    FlightController.getAllFlights);

router.get('/:id',
    FlightController.getFlight);

router.patch('/:id/seats',FlightMiddlewares.updateValidateRequest,
    FlightController.updateSeats
);

module.exports=router;