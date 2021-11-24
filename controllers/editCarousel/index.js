const mongoose = require('mongoose')

module.exports = async(req, res) =>{
    if(!req.params || !req.params.id){
        res.status(400).send({
            msg : 'bad request . please provide requests params correctly'
        })
        return
    }
    const _id = req.params.id
    try {
        await mongoose.model('Carousel').updateOne({_id},{
            url : req.body.url,
        })
        res.status(200).send({
            msg : 'updated'
        })
    } catch (error) {
        console.log(error)
        res.status(404).send({
            msg : 'there is not a carousel with this id'
        })
    }
}
// if user wants to just update url can use this function and if it wants to change the picture must creatte a new carousel with the same url and its cause iam too lazy for that now