const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    try {
        const carousel = await new mongoose.model('Carousel')({
            url : req.body.url,
            imageurl : `/images/${req.file.filename}`
        })
        carousel.save()
        res.status(200).send({
            msg : 'image added',
            carousel
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg : 'something went wrong'
        })
    }
}