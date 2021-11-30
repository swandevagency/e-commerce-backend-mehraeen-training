const mongoose = require('mongoose')

const homepageSchema = new mongoose.Schema({
    title : {
        type : 'string'
    }
})

module.exports = homepageSchema 