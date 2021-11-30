const mongoose = require('mongoose');

module.exports = async (req, res) =>{
    try {
        const adminpersonalinfo = await mongoose.model('Admin').findOne({_id : req.admin._id});
        res.status(200).send({
        adminpersonalinfo,
        msg : 'admins infos'
    })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg : 'something went wrong'
        })
    }
    
}