const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    if(!req.params || !req.params.id){
        res.status(400).send({
            msg : 'please provide request params correctly'
        })
        return
    }
    const _id = req.params.id
    try {
        await mongoose.model('Product').deleteOne({_id})
        res.status(200).send({
            msg : 'product deleted'
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            msg : 'there is not a product with this id'
        })
    }
}