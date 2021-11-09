const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
jwt_admin_key = 'this-is-secret-key-for-admin-jwt-tokens'

module.exports = async (req, res) =>{

    

    const decodedId = await jwt.decode(req.headers.authorization.split(' ')[1], jwt_admin_key)._id
    console.log(req.params.id)
    console.log(decodedId)
    
    const isThisAdminOwner = await mongoose.model('Admin').findOne({_id : decodedId});
    console.log(isThisAdminOwner.isOwner)
    console.log('function reciver till here')
    if(req.params.id != decodedId && !isThisAdminOwner.isOwner){
        res.status(403).send({
            msg : 'access denied'
        })
        return
    }
    console.log('kiram tu js')
    const adminpersonalinfo = await mongoose.model('Admin').findOne({_id : req.params.id});
    res.status(200).send({
        adminpersonalinfo,
        msg : 'admins infos'
    })
}