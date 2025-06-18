const authorize = (arrType) => { 
    return (req, res, next) => {
        const { user } = require('../models/index.js');
        if ((arrType).findIndex(role => role === req.user.type) !== -1) {
            next();
        } else {
            res.status(403).send({ error: 'Forbidden access. You do not have permission to perform this action.' });
        }
    }
}
module.exports = {
    authorize,
};