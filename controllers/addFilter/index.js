const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;


module.exports = async (req , res) =>{
    const _id = req.params.subcategoryid
    if(!ObjectId.isValid(_id)){
        res.status(400).send({
            msg : 'please provide a valid sub category id'
        })
        return
    }
    if(!req.body.filterName || !req.body.filterValidValues){
        res.status(400).send({
            msg : 'please provide a filter name and filter valid values '
        })
        return
    }

    const {filterName, filterValidValues} = req.body
    const filterAlreadyExists = await mongoose.model('Filter').findOne({for: _id, filterName})
    if(filterAlreadyExists){
        res.status(400).send({
            msg : 'a filter with this name for this sub category exists'
        })
        return
    }
    if(!Array.isArray(filterValidValues)){
        res.status(400).send({
            msg : 'filter valid values must be an array'
        })
        return
    }
    try {
        const filter = new mongoose.model('Filter')({
            for : _id,
            filterName,
            filterValidValues
        })
        await filter.save()
        const subCategory = await mongoose.model('subCategory').findOne({_id})
        let {filters} = subCategory
        filters.push(filter._id)
        await subCategory.save()
        res.status(200).send({
            msg : 'filter added',
            subCategory: await subCategory.populate('filters')
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg : 'something went wrong'
        })
    }
}