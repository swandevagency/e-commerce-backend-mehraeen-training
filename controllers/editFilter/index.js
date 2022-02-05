const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = async (req, res) =>{

    if(!req.body.filterName || !req.body.filterValidValues){
        res.status(400).send({
            msg : 'please provide a filterName and an array for filterValidValues'
        })
        return
    }
    const {filterName, filterValidValues} = req.body

    const {subcategoryid, filterid} = req.params

    if(!ObjectId.isValid(subcategoryid)){
        res.status(400).send({
            msg : 'please provide sub category id correctly'
        })
        return
    }
    if(!ObjectId.isValid(filterid)){
        res.status(400).send({
            msg : 'please provide filter id correctly'
        })
        return
    }
    const validSubCategory = await mongoose.model('subCategory').findOne({_id : subcategoryid})
    if(!validSubCategory){
        res.status(404).send({
            msg : 'there is no sub category with this id'
        })
        return
    }
    const filterNeedEdit = await mongoose.model('Filter').findOne({_id : filterid})
    if(!filterNeedEdit){
        res.status(404).send({
            msg : 'there is no filter with this id'
        })
        return
    }
    const repetitiveFilter = await mongoose.model('Filter').findOne({for : subcategoryid,filterName})
    if(repetitiveFilter){
        if(repetitiveFilter._id.toString() !== filterid.toString()){
            res.status(400).send({
                msg : 'there is a filter with this name for this sub category'
            })
            return
        }
        repetitiveFilter.filterValidValues = filterValidValues
        await repetitiveFilter.save()
        res.status(200).send({
            msg : 'filter successfully updated',
            repetitiveFilter
        })
        return
    }
    await mongoose.model('Filter').updateOne({_id : filterid},{
        filterName,
        filterValidValues
    })
    res.status(200).send({
        msg : 'filter updated successfully'
    }) 

}