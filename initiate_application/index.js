// requiring the requirements

const mongoose = require('mongoose');
const {ownerInfo} = require('../config/index');
const bcrypt = require('bcrypt');
require('../models/index')

module.exports = async() => {

    //making sure that the owner does not exist and if it does returning the function
    const ownerAlreadyExists = await mongoose.model('Admin').findOne({isOwner: true});
    if(ownerAlreadyExists){
        return;
    }

    // creating an owner to begin with the info set on the owner info object in config file

    const {firstname, lastname, username, password} = ownerInfo;
    const isOwner = true

    try {
        
        const hashedPassword = async () => {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(password, salt);     
        }
    
        //const Owner = mongoose.model('Admin');
        
        const owner = new mongoose.model('Admin')({
            firstname,
            lastname,
            username,
            isOwner,
            password: await hashedPassword()
        });
        owner.save();
    

    } catch (error) {
        
        console.log(error);
        process.exit();

    }
}