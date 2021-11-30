const mongoose = require('mongoose')
require('../models/index')

module.exports = async () =>{
    const titleAlreadyExists = await mongoose.model('Homepage').countDocuments()
    console.log(titleAlreadyExists)
    if(titleAlreadyExists > 0){
        return
    }
    try {
        const newTitle = await new mongoose.model('Homepage')({
            title : 'gubralitiez'
        })
        await newTitle.save();
        //const Homepage = mongoose.model('Homepage').find()[0];
    } catch (error) {
        console.log(error)
        process.exit();
    }
}