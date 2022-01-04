const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    const _id = req.params.subcategoryid
    const validSubCategory = await mongoose.model('subCategory').findOne({_id})
    if(!validSubCategory){
        res.status(404).send({
            msg : 'this sub category does not exist'
        })
        return
    }
    try {
        await mongoose.model('subCategory').updateOne({_id},{image : `/images/${req.file.filename}`})
        res.status(200).send({
            msg : 'sub category image updated'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg : 'something went wrong'
        })
    }
}