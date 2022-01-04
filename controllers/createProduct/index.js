const mongoose = require('mongoose');
const {Schema} = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;


module.exports = async (req, res) =>{
    const {name, description, price, discount, categoryId, subCategoryId} = req.body;
    if(!name || !description || !price || !categoryId || !subCategoryId){
        res.status(400).send({
            msg : 'please provide all fields'
        })
        return
    }
    
    if(!ObjectId.isValid(categoryId)){
        res.status(400).send({
            msg : 'please provide category id correctly'
        })
        return
    }
    if(!ObjectId.isValid(subCategoryId)){
        res.status(400).send({
            msg : 'please provide subcategory id correctly'
        })
        return
    }
    const categoryExists = await mongoose.model('Category').findOne({_id : categoryId});
    if(!categoryExists){
        res.status(404).send({
            msg : 'this category does not exist'
        })
        return
    }

    const subcategoryExists = await mongoose.model('subCategory').findOne({_id : subCategoryId});
    if(!subcategoryExists){
        res.status(404).send({
            msg : 'this sub category does not exist'
        })
        return
    }
    const productAlreadyExist = await mongoose.model('Product').findOne({name, category:categoryId, subCategory:subCategoryId})
    if(productAlreadyExist){
        res.status(400).send({
            msg : 'a product with the same name, category, and sub category already exist',
            //productAlreadyExist: await productAlreadyExist._id
            product :  await productAlreadyExist.populate([{path: 'category'},{path : 'subCategory'}])
        })
        return
    }
    try {
        const product =  new mongoose.model('Product')({
            name ,
            description ,
            price ,
            discount,
            category: categoryId,
            subCategory : subCategoryId
        })
        await product.populate('subCategory')
        product.details = product.subCategory.filters
        await product.save();
        res.status(200).send({
            product: await product.populate([{path : 'category'},{path : 'subCategory'}])
        })
        // it also could have been written like this, but in this way you will send category twice,once not populated and the populated one belongs to subCategory
        // product: await product.populate({
        //     path : 'subCategory',
        //     populate : 'Category' 
        // })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg : 'something went wrong'
        })
    }   
}