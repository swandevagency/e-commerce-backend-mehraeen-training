const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    const categories = await mongoose.model('Category').find()
    if(!categories){
        res.status(500).send({
            msg : 'some thing went wrong'
        })
        return
    }
    res.status(200).send({
        categories
    })
}