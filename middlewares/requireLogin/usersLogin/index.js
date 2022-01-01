const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')        
jwt_user_key = 'we-will-make-this-one-different-for-users'



module.exports = async (req, res, next) =>{
    if(!req.headers || !req.headers.authorization){
        res.status(400).send({
            msg : 'you request headers has not been provided correctly'
        })
        return
    }
    try {
        //jwt.verify(req.headers.authorization.split(' ')[1], jwt_user_key)
        const {_id} = await jwt.decode(req.headers.authorization.split(' ')[1], jwt_user_key)
        const user = await mongoose.model('User').findOne({_id})
        req.user = user
        next()
    } catch (error) {
        console.log(error)
            res.status(403).send({
                msg : 'you are not authenticated'
            })
        return
        }
};