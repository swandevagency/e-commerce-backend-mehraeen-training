const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const mongoose = require('mongoose');
//const expressBusboy = require('express-busboy');
// expressBusboy.extend(app,{upload : true , path : 'uploads/images'});
//adding a comment for testing git


const { router } = require('./routes');
const checkingEssentials = require('./checkingEssentials/index')
const initiateApplication = require('./initiate_application/index')


// connecting to database

mongoose.connect('mongodb://localhost:27017/e-commerce')
.then(() => {console.log('database is connected')},
err => {console.log('can not connect to database')})





// middlewares

app.use(cors());


app.use(express.urlencoded({ extended : true}));

app.use(express.json());

app.use('/', router)


checkingEssentials();
initiateApplication();

// running server
app.listen(port, () =>{
    console.log('server is running')
})

