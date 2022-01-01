const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    try {
        const users = await mongoose.model('User').find().populate('favoriteProducts')
        if(!users){
            req.status(500).send({
                msg : 'something went wrong'
            })
        }
        res.status(200).send({
            users
        })
    } catch (error) {
        console.log(error);
    }
    
}