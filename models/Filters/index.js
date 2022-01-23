const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;
const {Schema} = require('mongoose')



const filterSchema = new mongoose.Schema({
    for : {
        type : Schema.Types.ObjectId,
        ref : "subCategory"
    },
    filterName : {
        type : 'string'
    },
    filterValidValues : []
    // filterValidValues : {
    //     type : 'Array'
    // }
})

module.exports = filterSchema