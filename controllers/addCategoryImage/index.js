const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    const _id = req.params.id
    const validCategory = await mongoose.model('Category').findOne({_id})
    if(!validCategory){
        res.status(404).send({
            msg : 'there is no category with this id'
        })
        return
    }
    try {
        await mongoose.model('Category').updateOne({_id},{image : `/images/${req.file.filename}`})
        res.status(200).send({
            msg :  'category image updated'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg : 'something went wrong that is above your underestanding dont try to fix that'
        })
    }
}