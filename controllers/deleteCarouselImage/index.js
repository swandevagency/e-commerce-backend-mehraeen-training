const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    console.log(req.params)
    if(!req.params || !req.params.id){
        res.status(400).send({
            msg : 'bad request . please provide request params correctly'
        })
        return
    }
    const _id = req.params.id
    try {
        await mongoose.model('Carousel').deleteOne({_id})
        res.status(200).send({
            msg : 'carousel deleted'
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            msg : 'there is not a carousel with this id'
        })
    }
}