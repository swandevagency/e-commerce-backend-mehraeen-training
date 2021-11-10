const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
jwt_admin_key = 'this-is-secret-key-for-admin-jwt-tokens'



module.exports = async (req, res, next) =>{
    if(!req.admin.isOwner){
        res.status(403).send({
            msg : 'access denied'
        })
        return
    }
    next();
}