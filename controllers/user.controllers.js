const { user, sequelize } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const e = require('express');
const jwt= require('jsonwebtoken');
const gravatarurl = require('gravatar-url');

const register = async (req, res) => {
    const { name, email, password, numberPhone } = req.body;
    try {         
        const avatarUrl = gravatarurl(email);
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(newuUser.password, salt);
        const newuUser = await user.create({name, email, hashPassword, numberPhone, avatar: avatarUrl });
        res.status(201).send(newuUser);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while creating the user.' });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await user.findOne({ where: { email } });
        if (!existingUser) {
            return res.status(404).send({ error: 'User not found.' });
        }

        const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).send({ error: 'Invalid password.' });
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, 'your_secret_key', { expiresIn: 60 * 60 });
        res.status(200).send({existingUser, token });
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while logging in.' });
    }
}

const uploadAvatarController = async (req, res) => {
    const { file } = req;
    const urlImage = `http://localhost:3000/${file.path}`;

    const { user } = req;
    const userAvailable = await user.findOne({ where: {email: user.email } });
    userAvailable.avatar = urlImage;
    await userAvailable.save();
    res.status(200).send({
       message: 'Avatar uploaded successfully',
       file: req.file,
    });
 }

 const getAllTripsOfUser = async (req, res) => {
    const { result } = await sequelize.query(`SELECT 
  users.name AS userName,
  fromSta.name AS fromStation,
  toSta.name AS toStation
FROM users
INNER JOIN tickets ON users.id = tickets.user_id
INNER JOIN trips ON trips.id = tickets.trip_id
INNER JOIN stations AS fromSta ON fromSta.id = trips.fromStation
INNER JOIN stations AS toSta ON toSta.id = trips.toStation;
`);
res.status(200).send({
        message: 'All trips of user',
        result
    });
 }

module.exports = {
    register,
    login,
    uploadAvatarController,
    getAllTripsOfUser
}