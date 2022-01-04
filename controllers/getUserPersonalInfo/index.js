const mongoose = require('mongoose')


module.exports = async (req, res) =>{
    console.log(req.user._id)
    const {_id} = req.user
    try {
        const user = await mongoose.model('User').findOne({_id}).populate([{path:'favoriteProducts'},{path:'boughtProducts'}])
        if(!user){
            res.status(500).sedn({
                msg : 'something went wrong'
            })
            return
        }
        res.status(200).send({
            user
        })
    } catch (error) {
        console.log(error)
    }
}