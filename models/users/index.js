const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : 'string'
    },
    password : {
        type : 'string'
    },
    email : {
        type : 'string'
    }
})

module.exports = userSchema