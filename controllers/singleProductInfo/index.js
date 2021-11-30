const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    const _id = req.params.id
    try {
        const product = await mongoose.model('Product').findOne({_id})
        res.status(200).send({
            product
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            msg : 'there is no product with this id'
        })
    }
}