const {Station} = require('../models/index.js');
const { Op } = require('sequelize');

const createStation= async (req, res) => {
    const  {name, address, province} = req.body;
    try {
        const newStation = await Station.create({name, address, province});
        res.status(201).send(newStation);
    } catch (error) {
        console.error('Error creating station:', error);
        res.status(500).send({error: 'An error occurred while creating the station.'});
    }
}

const getAllStations = async (req, res) => {
    const { name, address, province } = req.query;
    try {
        if (name || address || province) {
            const filter = {};
            if (name) filter.name = { [Op.like]: `%${name}%` };
            if (address) filter.address = { [Op.like]: `%${address}%` };
            if (province) filter.province = { [Op.like]: `%${province}%` };
            
            const stations = await Station.findAll({ where: filter });
            res.status(200).send(stations);
        }
        else {
            const stations = await Station.findAll();
            res.status(200).send(stations);
        }
    } catch (error) {
        console.error('Error fetching stations:', error);
        res.status(500).send({error: 'An error occurred while fetching the stations.'});
    }
}

const getStationById = async (req, res) => {
    const { id } = req.params;
    try {
        const station = await Station.findByPk(id);
        if (station) {
            res.status(200).send(station);
        } else {
            res.status(404).send({error: 'Station not found.'});
        }
    } catch (error) {
        console.error('Error fetching station:', error);
        res.status(500).send({error: 'An error occurred while fetching the station.'});
    }
}

const updateStation = async (req, res) => {
    const { id } = req.params;
    const { name, address, province } = req.body;
    try {
        const station = await Station.findByPk(id);
        if (station) {
            station.name = name || station.name;
            station.address = address || station.address;
            station.province = province || station.province;
            await station.save();
            res.status(200).send(station);
        } else {
            res.status(404).send({error: 'Station not found.'});
        }
    } catch (error) {
        console.error('Error updating station:', error);
        res.status(500).send({error: 'An error occurred while updating the station.'});
    }
}

const deleteStation = async (req, res) => {
    const { id } = req.params;
    try {
        const station = await Station.findByPk(id);
        if (station) {
            await station.destroy();
            res.status(204).send();
        } else {
            res.status(404).send({error: 'Station not found.'});
        }
    } catch (error) {
        console.error('Error deleting station:', error);
        res.status(500).send({error: 'An error occurred while deleting the station.'});
    }
}

module.exports = {
    createStation,
    getAllStations,
    getStationById,
    updateStation,
    deleteStation,
};