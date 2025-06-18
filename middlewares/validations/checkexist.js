const checkExist = (model) => {
    return async (req, res, next) => {
        const { id } = req.params;
        const station = await model.findByPk(id);
        if (station) {
            next();
        }
        else {
            res.status(404).send({ error: 'Station not found.' });
        }
    }
}

module.exports = {
    checkExist,
};