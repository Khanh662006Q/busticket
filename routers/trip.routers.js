const express = require('express');
const {createTrip, getAllTrips, getTripById, updateTrip, deleteTrip} = require('../controllers/trip.controllers.js');
const { checkExist } = require('../middlewares/validations/checkexist.js');
const { Trip } = require('../models/index.js');

const tripRouter = express.Router();

tripRouter.post('/', createTrip);
tripRouter.get('/', getAllTrips);
tripRouter.get('/:id', checkExist(Trip) , getTripById);
tripRouter.put('/:id', checkExist(Trip) , updateTrip);
tripRouter.delete('/:id', checkExist(Trip) , deleteTrip);

module.exports = {
    tripRouter,
};
