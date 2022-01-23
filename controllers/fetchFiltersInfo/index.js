const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    try {
        const filters = await mongoose.model('Filter').find()
        res.status(200).send({
            filters
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg : 'something went wrong'
        })
    }
}