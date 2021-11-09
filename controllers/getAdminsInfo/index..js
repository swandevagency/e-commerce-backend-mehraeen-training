const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    const admins = await mongoose.model('Admin').find({})
    if(!admins){
        res.status(500).send({
            msg : 'something went wrong'
        })
        return
    }
    res.status(200).send({
        admins,
        msg : 'admins info sent as an array'
    })
}