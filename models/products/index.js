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
    // uniqueName : {
    //     type: 'String',
    //     default: `${this.name}.${this.category.name}`,
    //     required: true
    // },
    category : {
        type : Schema.Types.ObjectId,
        ref: "Category"
    },
    subCategory : {
        type : Schema.Types.ObjectId,
        ref : "subCategory"
    },
    details: {
        
    },
    images : [

    ]
})

module.exports = productSchema
