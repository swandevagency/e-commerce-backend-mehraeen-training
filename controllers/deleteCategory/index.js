const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    if(!req.params || !req.params.id){
        res.status(400).send({
            msg : 'request params must be provided'
        })
        return
    }
    const _id = req.params.id
    try {
        await mongoose.model('Category').deleteOne({_id})
        res.status(200).send({
            msg : 'category deleted'
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            msg : 'there is not a category with this id'
        })
    }
}