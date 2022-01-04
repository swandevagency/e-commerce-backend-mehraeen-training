// requiring packages

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


jwt_user_key = 'we-will-make-this-one-different-for-users'
jwt_admin_key = 'this-is-secret-key-for-admin-jwt-tokens'

module.exports = async (req, res) =>{
    const {username, password, logInAsAdmin} = req.body;

    // making sure that data provided 
    if(!username){
        res.status(400).send({
            msg : 'please provide a username'
        })
        return
    }
    if(!password){
        res.status(400).send({
            msg : 'please provide a password'
        })
        return
    }
    // validating admins
    if(logInAsAdmin){
        const admin = await mongoose.model('Admin').findOne({username : req.body.username})
        if(!admin){
            res.status(400).send({
                msg : 'invalid credentials.make sure that you want login as admin'
            })
            return
        }
        const passwordIsValid = await bcrypt.compare(password , admin.password)
        if(!passwordIsValid){
            res.status(400).send({
                msg : 'invalid credentials.make sure that you want login as admin'
            })
            return
        }
        const {_id} = admin
        const token = await jwt.sign({_id}, jwt_admin_key,{});
        if(admin.isOwner){
            res.status(200).send({
                token,
                role : 'owner',
                msg : `welcome dear ${admin.username}`
            })
            return
        }
        if(!admin.isOwner){
            res.status(200).send({
                token,
                role : 'admin',
                msg : `welcome ${admin.username}`
            })
        }
        // res.status(200).send({
        //     _id,
        //     token,
        //     msg : `welcome ${admin.username}`
        // })
    }
    //validating users
    if(!logInAsAdmin){
        const user = await mongoose.model('User').findOne({username : req.body.username})
        if(!user){
            res.status(400).send({
                msg : 'invalid credentials'
            })
            return
        }
        const passwordIsValid = await bcrypt.compare(password, user.password)
        if(!passwordIsValid){
            res.status(400).send({
                msg : 'invalid credentials'
            })
            return
        }
        const {_id} = user
        const token = await jwt.sign({_id}, jwt_user_key,{});
        res.status(200).send({
            token,
            role : 'user',
            msg : `welcome ${user.username}`
        })
    }
}