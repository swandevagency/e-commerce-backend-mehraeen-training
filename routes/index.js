const router = require('express').Router();




const  uploadMiddleware     = require('../middlewares/uploadmiddleware/index')
const {requireAdminLogin}   = require('../middlewares/requireLogin/index')
const {isOwner}             = require('../middlewares/requireLogin/index')
const {isUserAuthenticated} = require('../middlewares/requireLogin/index')
const {createProduct}       = require('../controllers/index')
const {register}            = require('../controllers/index')
const {login}               = require('../controllers/index') 
const {createAdmin}         = require('../controllers/index')
const {getAdminsInfo}       = require('../controllers/index')
const {editAdmin}           = require('../controllers/index')
const {personalAdminInfo}   = require('../controllers/index')
const {deletingAdmin}       = require('../controllers/index')
const {addProductImage}     = require('../controllers/index')
const {deleteProductImg}    = require('../controllers/index')
const {createCategory}      = require('../controllers/index')
const {deleteCategory}      = require('../controllers/index')
const {editCategory}        = require('../controllers/index')
const {fetchCategories}     = require('../controllers/index')
const {productsInfo}        = require('../controllers/index')
const {deleteProduct}       = require('../controllers/index')
const {editProduct}         = require('../controllers/index')
const {sendImage}           = require('../controllers/index')
const {addCarouselImage}    = require('../controllers/index')
const {carouselInfo}        = require('../controllers/index')
const {deleteCarouselImage} = require('../controllers/index')
const {editCarousel}        = require('../controllers/index')

const handeler = async (req, res)=>{
     console.log('this is handeler')
     console.log(req.params)
     console.log(req.body)
     console.log(req.file);
}


//////////////////////////////////////////////////

router.post('/products/buy:id',handeler)


/////////////////////////////////

router.post('/register',register)

router.post('/login', login)

router.get('/images/:uui',sendImage)

router.post('/admins',requireAdminLogin, isOwner, createAdmin)

router.get('/admins',requireAdminLogin, isOwner, getAdminsInfo)

router.get('/admins/:id', requireAdminLogin, personalAdminInfo)

router.put('/admins/:id', requireAdminLogin, editAdmin)

router.delete('/admins/:id',requireAdminLogin,isOwner,deletingAdmin)

router.post('/products',createProduct)

router.post('/products/:id',uploadMiddleware,addProductImage)

router.delete('/products/:id/:url',deleteProductImg)

router.get('/products',productsInfo)

router.delete('/products/:id',deleteProduct)

router.put('/products/:id', editProduct)

router.post('/categories',createCategory)

router.delete('/categories/:id',deleteCategory)

router.put('/categories/:id',editCategory)

router.get('/categories',fetchCategories)

router.post('/carousel',uploadMiddleware,addCarouselImage)

router.get('/carousel',carouselInfo)

router.delete('/carousel/:id',deleteCarouselImage)

router.put('/carousel/:id',editCarousel)
/////////////////////////////////////////////////////////////////////


router.get('/test',handeler)







module.exports = {
     router
}