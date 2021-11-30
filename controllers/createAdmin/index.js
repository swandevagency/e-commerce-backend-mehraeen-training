const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

module.exports = async (req, res) =>{
    const {firstname,lastname,username, password} = req.body;
    if(!firstname){
        res.status(400).send({
            msg : 'please provide firstname'
        })
        return
    }
    if(!lastname){
        res.status(400).send({
            msg : 'please provide a last name'
        })
        return
    }
    if(!username){
        res.status(400).send({
            msg : "please provide a username"
        })
        return
    }
    if(!password){
        res.status(400).send({
            msg : 'please provide a password'
        })
        return
    }
    const takenUsername = await mongoose.model('Admin').findOne({username : req.body.username})
    if(takenUsername){
        res.status(400).send({
            msg : 'this username already exist'
        })
        return
    }
    const admin = new mongoose.model('Admin')({
        firstname,
        lastname,
        username
    })
    const salt = await bcrypt.genSalt(10)
    admin.password = await bcrypt.hash(password,salt)
    admin.isOwner = false
    admin.save().then(()=>{
        res.status(200).send({
            msg : 'admin added'
        })
    })
}