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



module.exports=router;