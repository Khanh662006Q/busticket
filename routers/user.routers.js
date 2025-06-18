const express = require('express');
const { register, login } = require('../controllers/user.controllers.js');
const multer = require('multer');
// const { checkExist } = require('../middlewares/validations/checkexist.js');
// const { User } = require('../models/index.js');
const {user} = require('../models/user.js');

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);

const upload = multer({ dest: './uploads/avatars' });
userRouter.post('/upload-avatar', upload.single('avatar') , (req, res) => {

})
// userRouter.get('/', getAllStations);
// userRouter.get('/:id', getStationById);
// userRouter.put('/:id', checkExist(Station), updateStation);
// userRouter.delete('/:id', checkExist(Station), deleteStation);




module.exports = {
   userRouter,

}