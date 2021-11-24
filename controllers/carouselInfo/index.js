const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    try {
        const carousels = await mongoose.model('Carousel').find({})
        res.status(200).send({
            msg : 'carouseles',
            carousels
        })
    } catch (error) {
        res.status(500).send({
            msg : 'something went wrong'
        })
    }
}