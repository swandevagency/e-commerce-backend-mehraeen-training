const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    const products = await mongoose.model('Product').find()
    if(!products){
        res.status(500).send({
            msg : 'some thing went wrong'
        })
        return
    }
    res.status(200).send({
        products
    })
}