const { Trip, Station } = require('../models/index.js');

const createTrip = async (req, res) => {
    const { fromStation, toStation, startTime, price } =  req.body;
    try {
        const trip = await Trip.create({
            fromStation,
            toStation,
            startTime,
            price
        });

        res.status(201).json({
            message: 'Trip created successfully',
            trip
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating trip',
            error: error.message
        });
    }
}

const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.findAll({
            include: [
                {
                    model: Station,
                    as: 'fromStationDetails'
                },
                {
                    model: Station,
                    as: 'toStationDetails'
                }
            ]
        });

        res.status(200).json({
            message: 'Trips retrieved successfully',
            trips
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving trips',
            error: error.message
        });
    }
}

const getTripById = async (req, res) => {
    const { id } = req.params;
    const trip = await Trip.findByPk(id);
    
    if (trip) {
        res.status(200).json({
            message: 'Trip retrieved successfully',
            trip
        });
    } else {
        res.status(404).json({
            message: 'Trip not found'
        });
    }
}

const updateTrip = async (req, res) => {
    const { id } = req.params;
    const { fromStation, toStation, startTime, price } = req.body;

    const trip = await Trip.findByPk(id);
    
    if (trip) {
        trip.fromStation = fromStation;
        trip.toStation = toStation;
        trip.startTime = startTime;
        trip.price = price;

        await trip.save();
        
        res.status(200).json({
            message: 'Trip updated successfully',
            trip
        });
    } else {
        res.status(404).json({
            message: 'Trip not found'
        });
    }
}

const deleteTrip = async (req, res) => {
    const { id } = req.params;
    const trip = await Trip.findByPk(id);
    
    if (trip) {
        await trip.destroy();
        res.status(200).json({
            message: 'Trip deleted successfully'
        });
    } else {
        res.status(404).json({
            message: 'Trip not found'
        });
    }
}

module.exports = {
    createTrip,
    getAllTrips,
    getTripById,
    updateTrip,
    deleteTrip

};