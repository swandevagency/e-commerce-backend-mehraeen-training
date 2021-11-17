const mongoose = require('mongoose');
const {Schema} = require('mongoose')

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
        type : Schema.Types.ObjectId,
        ref: "Category"
    },
    images : []
})

module.exports = productSchema