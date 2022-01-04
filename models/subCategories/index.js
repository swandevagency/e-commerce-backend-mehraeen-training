const mongoose = require('mongoose');
const {Schema} = require('mongoose')


const subCategorySchema = new mongoose.Schema({
    name : {
        type : 'string',
    },
    Category : {
        type : Schema.Types.ObjectId,
        ref : 'Category'
    },
    filters: [

    ],
    image:{
        type : 'string'
    }
})

module.exports = subCategorySchema