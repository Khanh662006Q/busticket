const express = require('express');
const rootRouter = express.Router();
const { stationRouter } = require('./station.routers.js');
const { userRouter } = require('./user.routers.js');

rootRouter.use('/stations', stationRouter);
rootRouter.use('/users', userRouter);

module.exports = {
    rootRouter,
};