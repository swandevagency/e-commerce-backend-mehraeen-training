const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
jwt_admin_key = 'this-is-secret-key-for-admin-jwt-tokens'

module.exports = async (req, res) =>{
    console.log(`${req.admin._id} this is admins id`)

    // making sure that the admin who sent request is the real holder of acc or it is the owner of site
    if(req.admin._id != req.params.id && !req.admin.isOwner){
        res.status(403).send({
            msg : 'access denied'
        })
        return
    }

    
    //  the hard way to doing that
    // const decodedId = await jwt.decode(req.headers.authorization.split(' ')[1], jwt_admin_key)._id
    // const isThisAdminOwner = await mongoose.model('Admin').findOne({_id : decodedId});
    // if(req.params.id != decodedId && !isThisAdminOwner.isOwner){
    //     res.status(403).send({
    //         msg : 'access denied'
    //     })
    //     return
    // }
    const adminpersonalinfo = await mongoose.model('Admin').findOne({_id : req.params.id});
    res.status(200).send({
        adminpersonalinfo,
        msg : 'admins infos'
    })
}