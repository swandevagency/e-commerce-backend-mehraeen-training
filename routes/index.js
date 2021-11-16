const router = require('express').Router();




const  uploadMiddleware     = require('../middlewares/uploadmiddleware/index')
const {requireAdminLogin}   = require('../middlewares/requireLogin/index')
const {isOwner}             = require('../middlewares/requireLogin/index')
const {isUserAuthenticated} = require('../middlewares/requireLogin/index')
const {addproduct}          = require('../controllers/index')
const {register}            = require('../controllers/index')
const {login}               = require('../controllers/index') 
const {createAdmin}         = require('../controllers/index')
const {getAdminsInfo}       = require('../controllers/index')
const {editAdmin}           = require('../controllers/index')
const {personalAdminInfo}   = require('../controllers/index')
const {deletingAdmin}       = require('../controllers/index')
const {addProductImage}     = require('../controllers/index')
const {deleteProductImg}    = require('../controllers/index')

const handeler = async (req, res)=>{
     console.log('this is handeler')
     console.log(req.params)
     console.log(req.body)
     console.log(req.file);
     res.status(200).send('your request received to handeler')
}


//////////////////////////////////////////////////
router.get('/category', handeler)
router.get('/carousel', handeler)

router.post('/products/buy:id',handeler)

router.post('/categorys',handeler)

router.post('/carousel',handeler)

/////////////////////////////////

router.post('/register',register)

router.post('/login', login)

router.post('/admins',requireAdminLogin, isOwner, createAdmin)

router.get('/admins',requireAdminLogin, isOwner, getAdminsInfo)

router.get('/admins/:id', requireAdminLogin, personalAdminInfo)

router.put('/admins/:id', requireAdminLogin, editAdmin)

router.delete('/admins/:id',requireAdminLogin,isOwner,deletingAdmin)

router.post('/products',requireAdminLogin,addproduct)

router.post('/products/:id',uploadMiddleware,addProductImage)
/////////////////////////////////////////////////////////////////////

router.delete('/products/:id/:url',deleteProductImg)

router.post('/test',handeler)







module.exports = {
     router
}