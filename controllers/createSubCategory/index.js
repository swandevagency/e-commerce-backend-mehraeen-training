const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;



module.exports = async (req, res) =>{
    console.log('request received to creating sub category')
    if(!req.body.name || !req.body.categoryId){
        res.status(400).send({
            msg : 'please provide a name and a categoryId'
        })
        return
    }
    const {name , categoryId, filters} = req.body
    if(!ObjectId.isValid(categoryId)){
        res.status(400).send({
            msg : 'please provide category id correctly'
        })
        return
    }
    const categoryIsValid = await mongoose.model('Category').findOne({_id : categoryId})
    if(!categoryIsValid){
        res.status(404).send({
            msg : 'this category does not exist'
        })
        return
    }
    const subcategoryExists = await mongoose.model('subCategory').findOne({name ,Category: categoryId})
    console.log(subcategoryExists)
    if(subcategoryExists){
        res.status(400).send({
            msg : 'this sub category already exists'
        })
        return
    }
    const subcategory = new mongoose.model('subCategory')({
        name,
        Category : categoryId,
        filters
    })
    await subcategory.save()
    res.status(200).send({
        msg : 'sub category successfully added',
        subcategory : await subcategory.populate('Category')
    })
}