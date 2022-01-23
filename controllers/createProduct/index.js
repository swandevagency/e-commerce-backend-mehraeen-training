const mongoose = require('mongoose');
const {Schema} = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;




module.exports = async (req, res) =>{
    

    if(!req.body.name || !req.body.description || !req.body.price || !req.body.categoryId || !req.body.subCategoryId || !req.body.details){
        res.status(400).send({
            msg : 'please provide all fields'
        })
        return
    }
    const {name, description, price, discount, categoryId, subCategoryId, details} = req.body;
    
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
    await subcategoryExists.populate('filters')

    const productAlreadyExist = await mongoose.model('Product').findOne({name})
    if(productAlreadyExist){
        res.status(400).send({
            msg : 'a product with the same name already exist',
            product :  await productAlreadyExist.populate([{path: 'category'},{path : 'subCategory'}])
        })
        return
    }

    const {filters} = subcategoryExists
    const detailsKeys = Object.keys(details)

    const filtersKeys = []
    filters.forEach(filter =>{
        filtersKeys.push(filter.filterName)
    })


    if(filters.length > detailsKeys.length){
        res.status(400).send({
            msg : `all filters of this sub category required for creating product : ${filtersKeys}`
        })
        return
    }

    if(filters.length < detailsKeys.length){

        return res.status(400).send({
            msg : `you are setting more details than you declared in this sub category filters, declared filters are : ${filtersKeys}`
        });

    }
    for(const filter of filters){
        if(detailsKeys.indexOf(filter.filterName) === -1){
            res.status(400).send({
                msg : `${filter.filterName} required`
            })
            return
        }
        if(!filter.filterValidValues.includes(details[filter.filterName])){
            res.status(400).send({
                msg : `the value you have chosen for ${filter.filterName} is not declared in the sub category filters valid values`
            })
            return
        }
    }

    try {
        const product =  new mongoose.model('Product')({
            name ,
            description ,
            price ,
            discount,
            category: categoryId,
            subCategory : subCategoryId,
            details
        })
        await product.save();
        res.status(200).send({
            product: await product.populate([{path : 'category'},{path : 'subCategory'}])
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg : 'something went wrong'
        })
    }   
}
