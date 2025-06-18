const express = require('express');
const { register, login, uploadAvatarController, getAllTripsOfUser } = require('../controllers/user.controllers.js');
const { authenticate } = require('../middlewares/authentication/authenticate.js');
const {uploadImage} = require('../middlewares/upload/upload.js');
// const { checkExist } = require('../middlewares/validations/checkexist.js');
// const { User } = require('../models/index.js');
const {user} = require('../models/user.js');

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);

userRouter.post('/upload-avatar', authenticate , uploadImage('avatar') , uploadAvatarController);
userRouter.get('/all-trips', authenticate, getAllTripsOfUser)
// userRouter.get('/', getAllStations);
// userRouter.get('/:id', getStationById);
// userRouter.put('/:id', checkExist(Station), updateStation);
// userRouter.delete('/:id', checkExist(Station), deleteStation);




module.exports = {
   userRouter,

}