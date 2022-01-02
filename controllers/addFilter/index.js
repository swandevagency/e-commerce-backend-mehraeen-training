const mongoose = require('mongoose')
const ObjectId = require('mongoose').Types.ObjectId;




module.exports = async (req, res) =>{
const test = [{one : 'one'},{two : 'two'},{three: 'three'}]

const goh = {one : 'two'}

const shit = test.indexOf(goh)
console.log(shit)


// since its hard to find out that  the value that user want to add to the filters array already exists in array or not 
// we can just create the array from the beginig and after that user will be unable to add something to it 
// it just can be edited by user 





















    console.log(typeof(req.body),req.body.length,req.body[0])
    const _id = req.params.subCategoryId
    if(!ObjectId.isValid(_id)){
        res.status(400).send({
            msg : 'please provide a valid sub category id'
        })
        return
    }
    const validSubCategory = await mongoose.model('subCategory').findOne({_id})
    if(!validSubCategory){
        res.status(404).send({
            msg : 'this sub category does not exist'
        })
        return
    }
    try {
        const {filters} = validSubCategory
        //console.log(filters)
    } catch (error) {
        res.status(500).send({
            msg : 'something went wrong'
        })
    }
}