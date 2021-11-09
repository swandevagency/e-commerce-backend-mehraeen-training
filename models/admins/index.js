const mongoose = require('mongoose');

let adminSchema = new mongoose.Schema({
    firstname: {
        type : 'string'
    },
    lastname : {
        type : 'string'
    },
    username : {
        type : 'String'
    },
    password : {
        type : 'string'
    },
    isOwner : {
        type : Boolean
    },
})

module.exports = adminSchema