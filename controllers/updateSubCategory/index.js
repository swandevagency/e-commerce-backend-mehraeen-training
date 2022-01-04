const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;




module.exports = async (req, res) =>{
    if(!req.body.name || !req.body.categoryId || !req.body.filters){
        res.status(400).send({
            msg : 'please provide all fields'
        })
        return
    }
    const subCategoryNeedChangeId = req.params.subcategoryid
    const {name, categoryId} = req.body
    if(!ObjectId.isValid(subCategoryNeedChangeId)){
        res.status(400).send({
            msg : 'please provide a valid sub category id'
        })
        return
    }
    if(!ObjectId.isValid(categoryId)){
        res.status(400).send({
            msg : 'please provide a valid category id'
        })
        return
    }
    const validSubCategory = await mongoose.model('subCategory').findOne({_id : subCategoryNeedChangeId})
    if(!validSubCategory){
        res.status(404).send({
            msg : 'this sub category does not exist'
        })
        return
    }
    const validCategory = await mongoose.model('Category').findOne({_id : categoryId})
    if(!validCategory){
        res.status(404).send({
            msg : 'this category does not exist'
        })
    }
    const subCategoryWithTheseNameAndCategoryExist = await mongoose.model('subCategory').findOne({name , Category :categoryId})
    if(subCategoryWithTheseNameAndCategoryExist){
        if(subCategoryWithTheseNameAndCategoryExist._id.toString() !== validSubCategory._id.toString()){
            console.log('function received here should be return compeletly')
            res.status(400).send({
                msg : 'there is another sub category with these name and category'
            })
            return
        }
        console.log('function received here means you just want to change filters')
        await mongoose.model('subCategory').updateOne({_id: req.params.subcategoryid},{
            filters : req.body.filters
        })
        let products = await mongoose.model('Product').find({subCategory: req.params.subcategoryid}).populate('subCategory')
        products.forEach(product => {
            product.details = product.subCategory.filters
            product.save()
        });
        //await mongoose.model('Product').updateMany({subCategory: req.params.subcategoryid})
        res.status(200).send({
            msg : `sub category filters must have been changed for ${validSubCategory.name}`
        })
        return
    }
    try {
        await mongoose.model('subCategory').updateOne({_id : req.params.subcategoryid},{
            name,
            Category : categoryId,
            filters : req.body.filters
        })

        const products = await mongoose.model('Product').find({subCategory: req.params.subcategoryid}).populate('subCategory')
        products.forEach(product => {
            product.details = product.subCategory.filters
            product.save()
        });
        console.log(products[0].details)
        //await mongoose.model('Product').updateMany({subCategory: req.params.subcategoryid})
        res.status(200).send({
            msg : 'sub category updated'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg : 'something went wrong'
        })
    }
}
// yaru kollesho migire kollesho avaz mikine mide
// faqat bayad hatman ye array ba esm e filters befreste hatta age khali bashe