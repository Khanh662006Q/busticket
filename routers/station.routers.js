const express = require('express');
const { createStation, getAllStations, getStationById, updateStation, deleteStation, filterStations } = require('../controllers/station.controllers.js');
const { checkExist } = require('../middlewares/validations/checkexist.js');
const { Station } = require('../models/index.js');
const { authenticate } = require('../middlewares/authentication/authenticate.js');
const { authorize } = require('../middlewares/authentication/authorize.js');

const stationRouter = express.Router();

stationRouter.post('/', authenticate, authorize(["ADMIN"]) , createStation);
stationRouter.get('/', getAllStations);
stationRouter.get('/:id', getStationById);
stationRouter.put('/:id', checkExist(Station), updateStation);
stationRouter.delete('/:id', authenticate, authorize(["ADMIN"]) , checkExist(Station), deleteStation);




module.exports = {
    stationRouter,

}