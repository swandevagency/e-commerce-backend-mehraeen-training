const mongoose = require('mongoose');
const {Schema} = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;


module.exports = async (req, res) =>{
    const {name, description, price, discount, categoryId} = req.body;
    if(!name || !description || !price || !categoryId){
        res.status(400).send({
            msg : 'please provide all fields'
        })
        return
    }
    const newProduct = await mongoose.model('Product').findOne({name : req.body.name})
    if(newProduct){
        res.status(400).send({
            msg : 'there is a product with this name'
        })
        return
    }
    console.log(ObjectId.isValid(categoryId))
    if(!ObjectId.isValid(categoryId)){
        res.status(400).send({
            msg : 'please provide category id correctly'
        })
        return
    }
    const categoryExists = await mongoose.model('Category').findOne({_id : categoryId});
    if(!categoryExists){
        res.status(404).send({
            msg : 'this category does not exist'
        })
        return
    }
    // const yo = product.findOne({_id}).populate('category');
    const product =  new mongoose.model('Product')({
        name ,
        description ,
        price ,
        discount,
        category: categoryId,
    })
    await product.save();
    res.status(200).send({
        product: await product.populate('category')
    })
}