const jwt = require('jsonwebtoken');
jwt_admin_key = 'this-is-secret-key-for-admin-jwt-tokens'
const mongoose = require('mongoose')

module.exports = async (req, res, next) =>{
    if(!req.headers || !req.headers.authorization){
        res.status(400).send({
            msg : 'you request headers has not been provided correctly'
        })
        return
    }
    try {
        jwt.verify(req.headers.authorization.split(' ')[1], jwt_admin_key)
        const {_id} = await jwt.decode(req.headers.authorization.split(' ')[1], jwt_admin_key)
        const admin = await mongoose.model('Admin').findOne({_id})
        req.admin = admin
    } catch (error) {
        console.log(error)
            res.status(403).send({
                msg : 'you are not an admin'
            })
        return
        }
    next()
}