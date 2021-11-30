const mongoose = require('mongoose')
const {Schema} = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = async (req, res) =>{
    if(!req.params || !req.params.id){
        res.status(400).send({
            msg : 'please provide valid params for request'
        })
        return
    }
    const {name , description, price, discount, categoryId} = req.body
    const _id = req.params.id
    if(!categoryId || !name || !description || !price ){
        res.status(400).send({
            msg : 'please provide all fields'
        })
        return
    }
    if(!ObjectId.isValid(categoryId)){
        res.status(400).send({
            msg : 'please provide a valid category id'
        })
        return
    }
    const productExist = await mongoose.model('Product').findOne({name})
    if(productExist && productExist._id.toString() !== _id.toString()){
        res.status(400).send({
            msg : 'this name has been taken'
        })
        return
    }
    try {
        const product = await mongoose.model('Product').findOne({_id})
        await product.updateOne({name, description, price, categoryId})
        res.status(200).send({
            msg : 'product updated',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            msg : 'there is not a product with this id'
        })
    }
}