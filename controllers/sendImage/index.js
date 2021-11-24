const mongoose = require('mongoose')

module.exports = async(req, res) =>{
    console.log('request received to send image')
    console.log(req.params.uui);
    res.set({'Content-Type': 'image/png'});
    res.sendFile(`C:/Users/Yousef/Documents/work-space/e-commerce-backend/uploads/images/${req.params.uui}`)
}