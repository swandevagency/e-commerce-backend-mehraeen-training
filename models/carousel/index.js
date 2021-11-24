const mongoose = require('mongoose');

const carouselSchema = new mongoose.Schema({
    url : {
        type :'string'
    },
    imageurl : {
        type : 'string'
    }
})

module.exports = carouselSchema