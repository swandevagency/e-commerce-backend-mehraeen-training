const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    try {
        const product = await mongoose.model('Product').findOne({_id : req.params.id})
        let {images} = product
        const index = images.indexOf(`${req.params.url}`)
        console.log(index)
        if(index > -1){
            images.splice(index, 1)
        }else{
            res.status(404).send({
                msg : 'there is not an image with this url in this product'
            })
            return
        }
        await mongoose.model('Product').updateOne({_id : req.params.id},{images})
        res.status(200).send({
            msg : 'image deleted'
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            msg : 'there is not a product with this id'
        })
    }

}