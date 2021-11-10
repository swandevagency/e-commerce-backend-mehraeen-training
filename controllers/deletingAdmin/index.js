const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    const id = req.params.id
    const mustDeleteThisAdmin = await mongoose.model('Admin').findOne({_id : id})
    if(!mustDeleteThisAdmin){
        res.status(404).send({
            msg : 'this admin does not exist'
        })
        return
    }
    try {
        await mongoose.model('Admin').deleteOne({_id : id})
        res.status(200).send({
            msg : 'admin deleted'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg : 'something went wrong refresh to be sure'
        })
    }
}