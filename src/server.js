const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;
const mongoose_Url = process.env.MONGODB_URL;
const app = express()
const userRouts = require('./routes/user.routes')
app.use(express.json())
app.use('/api', userRouts)
async function Start () {
    mongoose.set('strictQuery', true);
    await mongoose.connect(mongoose_Url)
    .then(res => {
        console.log('mongoose to connect');
    })
    .catch(err => {
        console.log('mongoose to connet errors');
    }) 
    app.listen(PORT, () => {
        console.log('Server to running to', PORT);
    })

};
Start()