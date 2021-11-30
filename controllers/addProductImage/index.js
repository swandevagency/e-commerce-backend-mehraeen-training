const mongoose = require('mongoose')


module.exports = async(req, res)=>{
    try {
        const product = await mongoose.model('Product').findOne({_id : req.params.id})
        let {images} = product 
        images.push(`/images/${req.file.filename}`)
        await mongoose.model('Product').updateOne({_id : req.params.id},{images})
        res.status(200).send({
            msg : 'your product image added'
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            msg : 'there is not such a this product'
        })
    }
}