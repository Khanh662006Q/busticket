// yarn init
// yarn add sequelize mysql2 express
// yarn add sequelize-cli --dev
// yarn add bcryptjs 
// yarn add jsonwebtoken
// yarn add multer
// sequelize init
// 1 configs
// 2 models
// 3 rounters
//

const express = require('express');
console.log('Express loaded from:', require.resolve('express'));

const path= require('path');
const{sequelize} = require('./models/index.js');
const {rootRouter} = require('./routers/index.js');

const app = express();

app.use(express.json());

const publicPathDirectory = path.join(__dirname, './public');
app.use(express.static(publicPathDirectory));

app.use('/api/v1', rootRouter);

app.listen(3000, async () => {
    console.log('Server is running on http://localhost:3000');
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})
