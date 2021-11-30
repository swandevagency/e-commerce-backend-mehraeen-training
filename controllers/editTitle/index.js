
const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    if(!req.body.title){
        res.status(400).send({
            msg: 'please provide a valid title'
        })
        return
    }
    try {
        await mongoose.model('Homepage').updateOne({title : req.body.title})
        const homePageInfo = await mongoose.model('Homepage').find()
        const newTitle = homePageInfo[0]
        res.status(200).send({
            msg : 'updated',
            newTitle
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg : 'something went wrong'
        })
    }
}