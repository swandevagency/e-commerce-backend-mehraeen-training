const mongoose = require('mongoose');
const {Schema} = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : 'string'
    },
    password : {
        type : 'string'
    },
    email : {
        type : 'string'
    },
    favoriteProducts : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Product'
        }
    ],
    boughtProducts : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Product'
        }
    ]
})

module.exports = userSchema