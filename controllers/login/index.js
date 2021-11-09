// requiring packages

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


jwt_user_key = 'we-will-make-this-one-different-for-users'
jwt_admin_key = 'this-is-secret-key-for-admin-jwt-tokens'
jwt_owner_key = 'this-secret-key-has-been-maden-for-owner'

module.exports = async (req, res) =>{
    const {username, password, logInAsAdmin} = req.body;
    console.log(logInAsAdmin)
    console.log(req.body)

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
        console.log('loging admin')
        const admin = await mongoose.model('Admin').findOne({username : req.body.username})
        if(!admin){
            res.status(400).send({
                msg : 'invalid credentials. be sure that you want login as admin'
            })
            return
        }
        const passwordIsValid = await bcrypt.compare(password , admin.password)
        if(!passwordIsValid){
            res.status(400).send({
                msg : 'invalid credentials'
            })
            return
        }
        if(!admin.isOwner){
            const {_id} = admin;
            const token = await jwt.sign({_id}, jwt_admin_key,{});
            res.status(200).send({
            token,
            msg : `welcome ${admin.username}`
            })
            return
        }
        if(admin.isOwner){
            const {_id} = admin;
            const token = await jwt.sign({_id}, jwt_owner_key,{});
            res.status(200).send({
            token,
            msg : `welcome ${admin.username}`
            })
        }   
    }
    //validating users
    if(!logInAsAdmin){
        console.log('loging user')
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
            msg : `welcome ${user.username}`
        })
    }
}