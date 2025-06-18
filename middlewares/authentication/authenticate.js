const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Token');
    try {
        const decode = jwt.verify(token, 'your_secret_key');
        if (decode) {
            req.user = decode; // Attach the decoded user information to the request object
            return next();
        }
        else {
            res.status(401).send({ error: 'Unauthorized access. Invalid token.' });
        }
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while authenticating.' });
    }
}

module.exports = {
    authenticate,
}