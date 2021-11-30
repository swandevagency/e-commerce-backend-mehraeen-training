const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const expressBusboy = require('express-busboy');
// expressBusboy.extend(app,{upload : true , path : 'uploads/images'});


const { router } = require('./routes');
const checkingEssentials = require('./checkingEssentials/index')
const initiateApplication = require('./initiate_application/index')


// connecting to database

mongoose.connect('mongodb://localhost:27017/e-commers')
.then(() => {console.log('database is connected')},
err => {console.log('can not connect to database')})





// middlewares

app.use(cors());


app.use(express.urlencoded({ extended : true}));

app.use(express.json());

app.use('/', router)

// app.post('/addproduct',(req, res) =>{
//     console.log(req.body)
//     res.send('recived')
// })
checkingEssentials();
initiateApplication();

// running server
app.listen(port, () =>{
    console.log('server is running')
})

