const mongoose = require('mongoose')

const unUsedImageSchema = new mongoose.Schema({
    url : {
        type : 'string'
    }
})

module.exports = unUsedImageSchema