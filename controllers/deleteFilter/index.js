const mongoose = require('mongoose')

module.exports = async (req, res) =>{
    if(!req.params.subcategoryid || !req.params.filterid){
        res.status(400).send({
            msg : 'please provide subcategoryid and filterid correctly'
        })
        return
    }
    const subCategory = await mongoose.model('subCategory').findOne({_id : req.params.subcategoryid})
    if(!subCategory){
        res.status(404).send({
            msg : 'there is no sub category with this id'
        })
        return
    }
    try {
        await mongoose.model('Filter').deleteOne({_id : req.params.filterid})
        let {filters} = subCategory
        const i = filters.indexOf(req.params.filterid)
        filters.splice(i,1)
        subCategory.save()
        res.status(200).send({
            msg : 'successfully deleted'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg : 'something went wrong be sure that there is a filter with this id'
        })
    }
}