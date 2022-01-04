const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name : {
        type : 'string',
    },
    image: {
        type : 'string'
    }
})

module.exports = categorySchema