const mongoose = require('mongoose');


module.exports = async (req, res) =>{
    const {name, description, price, discount} = req.body;
    if(!name || !description || !price){
        res.status(400).send({
            msg : 'please provide all fields'
        })
        return
    }
    const newProduct = await mongoose.model('Product').findOne({name : req.body.name})
    if(newProduct){
        res.status(400).send({
            msg : 'this product already exist'
        })
        return
    }
    const product =  new mongoose.model('Product')({
        name : name,
        description : description,
        price : price,
        discount : discount
    })
    product.save()
    .then(result =>{
        res.status(200).send({
            msg : 'successfully added',
            result
        })
    })
}