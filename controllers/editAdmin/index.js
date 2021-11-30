const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) =>{
    
    //making sure that data provided compeletly
    if(!req.body.firstname || !req.body.lastname || !req.body.username || !req.body.password){
        res.status(400).send({
            msg : 'please fill all fields'
        })
        return
    }

    // making sure that the admin is the real holder of admin acc or it is the owner
    if(req.admin._id != req.params.id && !req.admin.isOwner){
        res.status(403).send({
            msg : 'access denied'
        })
        return
    }

    const admin = await mongoose.model('Admin').findOne({_id : req.params.id});
    if(!admin){
        res.status(404).send({
            msg : 'this admin does not exist'
        })
        return
    }

    // making sure that new username already does not exist
    const takenUsername = await mongoose.model('Admin').findOne({username : req.body.username})
    if(takenUsername && takenUsername._id.toString() !== req.params.id.toString()){
        res.status(400).send({
            msg : 'this username already exist'
        })
        return
    }

    // hashing new password
    
    const newPassword = req.body.password
    const hashedNewPassword = async (newPassword) =>{
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(newPassword, salt)
    }

    // storing changes in database

    try {
        await mongoose.model('Admin').updateOne({_id: req.params.id},{
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            username : req.body.username,
            password : await hashedNewPassword(newPassword)
        })
        res.status(200).send({
            msg : 'updated'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('something went wrong')
    }
}