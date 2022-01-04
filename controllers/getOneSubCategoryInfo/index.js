const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    try {
        const _id = req.params.subcategoryid
        const subCategory = await mongoose.model('subCategory').findOne({_id})
        res.status(200).send({
            subCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg : 'womething went wrong'
        })
    }
}