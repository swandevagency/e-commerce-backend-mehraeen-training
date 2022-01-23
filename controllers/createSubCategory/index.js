const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;



module.exports = async (req, res) =>{
    console.log('request received to creating sub category')
    if(!req.body.name || !req.body.categoryId || !req.body.filters){
        res.status(400).send({
            msg : 'please provide name, categoryId and filters(can be empty array) '
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
    if(subcategoryExists){
        res.status(400).send({
            msg : 'this sub category already exists'
        })
        return
    }
    if(!Array.isArray(filters)){
        res.status(400).send({
            msg : 'filters must be an array'
        })
        return
    }
    const filtersKeys = []
    filters.forEach(item =>{
        filtersKeys.push(item.filterName)
    })
    const repetitiveKeys = filtersKeys.filter((key, index) =>
        filtersKeys.indexOf(key) !== index
    )
    if(repetitiveKeys[0]){
        res.status(400).send({
            msg : `you are setting filters more than once : ${repetitiveKeys}`
        })
        return
    }
    if(filters[0]){
        for(const filter of filters){
            if(!filter.filterName || !filter.filterValidValues){
                return res.status(400).send({
                    msg : 'for any fiter a filterName and an array for filterValidValues are required'
                })
            }
            if(!Array.isArray(filter.filterValidValues)){
                return res.status(400).send({
                    msg : `filterValidValues for ${filter.filterName} must be an array`
                })
            }
            if(!filter.filterValidValues[0]){
                return res.status(400).send({
                    msg : `you are not setting any valid valid value for ${filter.filterName}`
                })
            }
        }
    }
    const subcategory = new mongoose.model('subCategory')({
        name,
        Category : categoryId,
    })
    await subcategory.save()
    let subCategroyFilters = subcategory.filters
    if(filters[0]){
        for(const filter of filters){
            const Filter = new mongoose.model('Filter')({
                for : subcategory._id,
                filterName : filter.filterName,
                filterValidValues : filter.filterValidValues
            })
            await Filter.save()
            subCategroyFilters.push(Filter._id)
            await subcategory.save()
        }
    }
    if(subcategory.filters[0]){
        res.status(200).send({
            msg : 'sub category added successfully',
            subcategory : await subcategory.populate([{path : 'Category'},{path : 'filters'}])
        })
    }
    if(!subcategory.filters[0]){
        res.status(200).send({
            msg : 'sub category successfully added without any filters',
            subcategory : await subcategory.populate('Category')
        })
    }
}