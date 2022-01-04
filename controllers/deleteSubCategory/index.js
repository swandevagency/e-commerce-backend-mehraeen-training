const mongoose = require('mongoose')

module.exports = async (req , res) =>{
    const _id = req.params.subcategoryid
    try {
        await mongoose.model('subCategory').deleteOne({_id})
            res.status(200).send({
                msg : 'successfully deleted'
            })
    } catch (error) {
        console.log(error)
        res.status(500).send('something went wrong')
    }    
}