const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

module.exports = async (req, res) =>{
    if(!req.body.firstname || !req.body.lastname || !req.body.username || !req.body.password){
        res.status(400).send({
            msg : 'please provide all fields'
        })
        return
    }
    // making sure that new username already does not exist
    const takenUsername = await mongoose.model('Admin').findOne({username : req.body.username})
    if(takenUsername && takenUsername._id.toString() !== req.admin._id.toString()){
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
        await mongoose.model('Admin').updateOne({_id: req.admin._id},{
            firstname : req.body.firstname, 
            lastname : req.body.lastname, 
            username : req.body.username ,
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