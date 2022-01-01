const router = require('express').Router();




const  uploadMiddleware        = require('../middlewares/uploadmiddleware/index')
const {requireAdminLogin}      = require('../middlewares/requireLogin/index')
const {isOwner}                = require('../middlewares/requireLogin/index')
const {isUserAuthenticated}    = require('../middlewares/requireLogin/index')
const {createProduct}          = require('../controllers/index')
const {register}               = require('../controllers/index')
const {login}                  = require('../controllers/index') 
const {createAdmin}            = require('../controllers/index')
const {getAdminsInfo}          = require('../controllers/index')
const {editAdmin}              = require('../controllers/index')
const {personalAdminInfo}      = require('../controllers/index')
const {deletingAdmin}          = require('../controllers/index')
const {addProductImage}        = require('../controllers/index')
const {deleteProductImg}       = require('../controllers/index')
const {createCategory}         = require('../controllers/index')
const {deleteCategory}         = require('../controllers/index')
const {editCategory}           = require('../controllers/index')
const {fetchCategories}        = require('../controllers/index')
const {productsInfo}           = require('../controllers/index')
const {deleteProduct}          = require('../controllers/index')
const {editProduct}            = require('../controllers/index')
const {sendImage}              = require('../controllers/index')
const {addCarouselImage}       = require('../controllers/index')
const {carouselInfo}           = require('../controllers/index')
const {deleteCarouselImage}    = require('../controllers/index')
const {editCarousel}           = require('../controllers/index')
const {singleProductInfo}      = require('../controllers/index')
const {editTitle}              = require('../controllers/index')
const {editAdminPersonalInfo}  = require('../controllers/index')
const {addUserFavoriteProduct} = require('../controllers/index')
const {getUsersInfo}           = require('../controllers/index')
const {createSubCategory}      = require('../controllers/index')

const handeler = async (req, res)=>{
     console.log('this is handeler')
     console.log(req.params)
     console.log(req.body)
     console.log(req.file);
}


//////////////////////////////////////////////////

router.post('/products/buy:id',handeler)


/////////////////////////////////

router.post('/register',register)//

router.post('/login',login)//

router.put('/homepage',requireAdminLogin,editTitle)

router.get('/images/:uui',sendImage)

router.post('/admins',requireAdminLogin, isOwner, createAdmin)//

router.get('/admins',requireAdminLogin, isOwner, getAdminsInfo)//

router.delete('/admins/:id',requireAdminLogin,isOwner,deletingAdmin)//

router.put('/admins/:id', requireAdminLogin, isOwner, editAdmin)//

router.get('/admin/me', requireAdminLogin, personalAdminInfo)//

router.put('/admin/me',requireAdminLogin,editAdminPersonalInfo)//

router.post('/products',requireAdminLogin,createProduct)//

router.get('/products',productsInfo)//

router.post('/products/:id',requireAdminLogin,uploadMiddleware,addProductImage)//

router.delete('/products/:id/:url',requireAdminLogin,deleteProductImg)//

router.get('/products/:id',singleProductInfo)//

router.delete('/products/:id',requireAdminLogin,deleteProduct)//

router.put('/products/:id',requireAdminLogin, editProduct)//

router.post('/categories',requireAdminLogin,createCategory)//

router.delete('/categories/:id',requireAdminLogin,deleteCategory)//

router.put('/categories/:id',requireAdminLogin,editCategory)//

router.get('/categories',fetchCategories)//

router.post('/carousel',requireAdminLogin,uploadMiddleware,addCarouselImage)//

router.get('/carousel',carouselInfo)//

router.delete('/carousel/:id',requireAdminLogin,deleteCarouselImage)//

router.put('/carousel/:id',requireAdminLogin,editCarousel)//

router.post('/user',isUserAuthenticated,addUserFavoriteProduct)

router.get('/users',requireAdminLogin,getUsersInfo)

router.post('/subcategory',requireAdminLogin,createSubCategory)


module.exports = {
     router
}