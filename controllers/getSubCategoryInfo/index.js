const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    const subCategories = await mongoose.model('subCategory').find().populate([{path : 'Category'},{path : 'filters'}])
    if(!subCategories){
        res.status(500).send({
            msg : 'something went wrong'
        })
        return
    }
    res.status(200).send({
        subCategories
    })
}