const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    const {name} = req.body
    if(!req.body || !name){
        res.status(400).send({
            msg : 'please provide a name for your category'
        })
        return
    }
    if(name.length < 3){
        res.status(400).send({
            msg : 'category name at least must have 3 charecters'
        })
        return
    }
    const categoryExist = await mongoose.model('Category').findOne({name})
    if(categoryExist){
        res.status(400).send({
            msg : ' already there is a category with this name'
        })
        return
    }
    try {
        await mongoose.model('Category').create({
            name
        })
        res.status(200).send({
            msg : 'category added'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg : 'something went wrong'
        })
    }
}