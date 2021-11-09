const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
jwt_admin_key = 'this-is-secret-key-for-admin-jwt-tokens'



module.exports = async (req, res, next) =>{
    if(!req.headers || !req.headers.authorization){
        res.status(400).send({
            msg : 'you request headers has not been provided correctly'
        })
        return
    }
    try {
        const {_id} = await jwt.decode(req.headers.authorization.split(' ')[1], jwt_admin_key)
        const id = _id
        console.log(id);
        const validOwner = await mongoose.model('Admin').findOne({_id : id})
        console.log(validOwner);
        console.log(validOwner.isOwner);
        if(validOwner.isOwner){
            next()
        }
        if(!validOwner.isOwner){
            res.status(403).send({
                msg : 'access denied'
            })
            return
        }
    } catch (error) {
        console.log(error)
            res.status(403).send({
                msg : 'access denied'
            })
        return
        }
    //next()
}