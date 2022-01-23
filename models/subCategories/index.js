const mongoose = require('mongoose');
const {Schema} = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;


const subCategorySchema = new mongoose.Schema({
    name : {
        type : 'string',
    },
    Category : {
        type : Schema.Types.ObjectId,
        ref : 'Category'
    },
    filters: [
        {type : Schema.Types.ObjectId,
        ref : 'Filter'
        }
    ],
    image:{
        type : 'string'
    }
})

module.exports = subCategorySchema