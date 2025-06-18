const express = require('express');

const fingerprintRouter = express.Router();

fingerprintRouter.get('/', (req, res) => {
    const fingerprint = req.fingerprint;
    res.status(200).json({
        message: 'Fingerprint retrieved successfully',
        fingerprint
    });
});