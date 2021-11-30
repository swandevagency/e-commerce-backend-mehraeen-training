// requiring packages

const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

module.exports = async (req, res) =>{
    const {username, password, email} = req.body;

    // making sure that valid data provided

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
    if(!email){
        res.status(400).send({
            msg : 'please provide a password'
        })
        return
    }

    //making sure that username and email are unique

    const isUsernameTaken = await mongoose.model('User').findOne({username : req.body.username})
    if(isUsernameTaken){
        res.status(400).send({
            msg : 'this username has been taken'
        })
        return
    }
    const isEmailTaken = await mongoose.model('User').findOne({ email : req.body.email})
    if(isEmailTaken){
        res.status(400).send({
            msg : 'this email has already used'
        })
        return
    }
    // storing user's info in database
    const user = new mongoose.model('User')(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.save()
    .then((response) => res.status(200).send({
        msg : 'successfully registered'
    })
    )
}