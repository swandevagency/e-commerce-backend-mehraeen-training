const mongoose = require('mongoose')

module.exports = async (req , res) =>{
    try {
       const user = await mongoose.model('User').findOne({_id :req.user._id})
       const validProduct = await mongoose.model('Product').findOne({_id : req.body.productId})
       if(!validProduct){
           res.status(404).send({
               msg : 'there is no product with this id'
           })
           return
       }
       let {favoriteProducts} = user
       const productAlreadyExist = await favoriteProducts.indexOf(req.body.productId)
       if(productAlreadyExist != -1){
            res.status(400).send({
                msg : 'this product already exists in favorites'
            })
            return
       }
       await favoriteProducts.push(req.body.productId)
       await mongoose.model('User').updateOne({_id: req.user._id},{favoriteProducts})  
       res.status(200).send({
           msg : 'successfully added'
       })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg : 'something went wrong'
        })
    }
}