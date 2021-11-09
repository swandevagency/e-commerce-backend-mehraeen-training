const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : 'string'
    },
    description : {
        type : 'string'
    },
    price : {
        type : 'number'
    },
    discount : {
        type : 'number'
    },
    category : {
        type : 'string'
    }
})

module.exports = productSchema