module.exports = async(req, res) =>{
    try {
        res.set({'Content-Type': 'image/png'});
        res.sendFile(`C:/Users/Yousef/Documents/work-space/e-commerce-backend/uploads/images/${req.params.uui}`)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg : 'something went wrong'
        })
    }
}