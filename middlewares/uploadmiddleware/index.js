const mongoose = require('mongoose');
const multer = require('multer')
const storage = multer.diskStorage({
    destination : (req, file, cb) =>{
        return cb(null, 'uploads/images')
    }
})
const checkFileType = (file, cb) =>{
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype)
    if(!mimetype){
        return cb(error = 'images only')
    }
    return cb(null, true)
}
const upload = multer({
    storage,
    fileFilter :  function(req, file, cb){
        checkFileType(file, cb)
    }
})
const uploadMiddleware = async (req, res, next) =>{
    upload.single('image')(req, res, (err)=>{
        if(req.file == undefined){
            res.status(400).send({
                msg : 'please provide an image'
            })
            return
        }
        if(err){
            if(err.code == 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).send({
                    msg : 'please send just one image'
                })
            }
            console.log(err);
            res.status(500).send({
                msg : "something went wrong"
            })
            return
        }
        mongoose.model('UnUsedImages').create({url : req.file.filename})
        next()
    })
}
module.exports = uploadMiddleware