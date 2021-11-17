const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    if(!req.params || !req.params.id){
        res.status(400).send({
            msg : 'please provide request params correctly'
        })
        return
    }
    
    const _id = req.params.id
    const categoryExist = await mongoose.model('Category').findOne({name : req.body.name})
    if(categoryExist){
        res.status(400).send({
            msg : 'this name has been used for another category'
        })
        return
    }
    try {
        const category = await mongoose.model('Category').findOne({_id})
        await category.updateOne({name : req.body.name})
        res.status(200).send({
            msg : 'category updated'
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            msg : 'there is not a category with this id'
        })
    }
}