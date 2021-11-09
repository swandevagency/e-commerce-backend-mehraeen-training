const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) =>{
    // _id = req.params.id
    const id = req.params.id

    const {_id} = await jwt.decode(req.headers.authorization.split(' ')[1], jwt_admin_key)
    const isThisAdminOwner = await mongoose.model('Admin').findOne({_id});
    console.log(isThisAdminOwner)
    if(req.params.id != _id && !isThisAdminOwner.isOwner){
        res.status(403).send({
            msg : 'access denied'
        })
        return
    }

    //making sure that data provided compeletrly

    if(!req.body.firstname || !req.body.lastname || !req.body.username || !req.body.password){
        res.status(400).send({
            msg : 'please fill all fields'
        })
        return
    }
    // making sure that this id exist          .findOne({_id})
    const admin = await mongoose.model('Admin').findOne({_id : id});
    if(!admin){
        res.status(404).send({
            msg : 'this admin does not exist'
        })
        return
    }

    // making sure that new username already does not exist
    const takenUsername = await mongoose.model('Admin').findOne({username : req.body.username})
    if(takenUsername){
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
        await mongoose.model('Admin').updateOne({_id: id},{firstname : req.body.firstname, lastname : req.body.lastname, username : req.body.username ,password : await hashedNewPassword(newPassword)})
        console.log(admin.password)
        res.status(200).send({
            msg : 'updated'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send('something went wrong')
    }
}