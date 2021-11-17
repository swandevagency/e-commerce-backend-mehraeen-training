const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) =>{
    
    //making sure that data provided compeletrly
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
    // hard way
    // const id = req.params.id

    // const {_id} = await jwt.decode(req.headers.authorization.split(' ')[1], jwt_admin_key)
    // const isThisAdminOwner = await mongoose.model('Admin').findOne({_id});
    // console.log(isThisAdminOwner)
    // if(req.params.id != _id && !isThisAdminOwner.isOwner){
    //     res.status(403).send({
    //         msg : 'access denied'
    //     })
    //     return
    // }

    

    
    // how this works with hard way            .findOne({_id : id})
    const admin = await mongoose.model('Admin').findOne({_id : req.params.id});
    if(!admin){
        res.status(404).send({
            msg : 'this admin does not exist'
        })
        return
    }

    // making sure that new username already does not exist
    const takenUsername = await mongoose.model('Admin').findOne({username : req.body.username})
    if(takenUsername && takenUsername._id != req.params.id){
        res.status(400).send({
            msg : 'this username already exist'
        })
        return
    }

    // hashing new password
    
    const newPassword = req.body.password
    const hashedNewPassword = async (newPassword) =>{
        console.log(newPassword)
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(newPassword, salt)
    }

    // storing changes in database

    try {                          //.updateOne({_id})
        await mongoose.model('Admin').updateOne({_id: req.params.id},{firstname : req.body.firstname, lastname : req.body.lastname, username : req.body.username ,password : await hashedNewPassword(newPassword)})
        console.log(admin.password)
        res.status(200).send({
            msg : 'updated'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('something went wrong')
    }
}