const express = require('express');
const rootRouter = express.Router();
const { stationRouter } = require('./station.routers.js');
const { userRouter } = require('./user.routers.js');
const { tripRouter } = require('./trip.routers.js');


rootRouter.use('/stations', stationRouter);
rootRouter.use('/users', userRouter);
rootRouter.use('/trips', tripRouter);

module.exports = {
    rootRouter,

};