const router = require('express').Router();

const {addproduct}          = require('../controllers/index')
const {requireAdminLogin}             = require('../middlewares/requireLogin/index')
const {isOwner}             = require('../middlewares/requireLogin//index')
const {isUserAuthenticated} = require('../middlewares/requireLogin/index')
const {register}            = require('../controllers/index')
const {login}               = require('../controllers/index') 
const {createAdmin}         = require('../controllers/index')
const {getAdminsInfo}       = require('../controllers/index')
const {editAdmin}           = require('../controllers/index')
const {personalAdminInfo}   = require('../controllers/index')

const handeler = async (req, res)=>{
     console.log('this is handeler')
     res.send('your request received')
}


router.get('/products',handeler)
router.get('/category', handeler)
router.get('/carousel', handeler)

router.post('/products',handeler)

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






module.exports = {
     router
}