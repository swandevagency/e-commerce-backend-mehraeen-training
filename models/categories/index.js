const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name : {
        type : 'string',
    }
})

module.exports = categorySchema