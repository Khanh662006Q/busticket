const { user } = require('../models/index.js');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');

const register = async (req, res) => {
    const { name, email, password, numberPhone } = req.body;
    try {         
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(newuUser.password, salt);
        const newuUser = await user.create({name, email, hashPassword, numberPhone});
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

module.exports = {
    register,
    login
}